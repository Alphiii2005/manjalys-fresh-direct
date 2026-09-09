import stripe

from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.db import transaction
from decimal import Decimal

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Order, OrderItem
from products.models import Product

from .emails import (
    send_customer_order_confirmation,
    send_owner_new_order_notification,
)

stripe.api_key = settings.STRIPE_SECRET_KEY


class CreateCheckoutSessionView(APIView):

    def post(self, request):

        order_id = request.data["order_id"]

        try:
            order = Order.objects.get(id=order_id)
        except Order.DoesNotExist:
            return Response(
                {"error": "Order not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        line_items = []

        for item in order.items.all():

            print(
                "NAME:",
                item.product.name,
                "PRICE:",
                item.price,
                "QUANTITY:",
                item.quantity
            )

            # Calculate the total price for this item.
            # Price comes from the Django database.
            final_price = (
                item.price *
                item.quantity
            )

            line_items.append(
                {
                    "price_data": {

                        "currency": "gbp",

                        "product_data": {
                            "name": (
                                f"{item.product.name} "
                                f"({item.quantity}kg)"
                            ),
                        },

                        "unit_amount": int(
                            final_price * Decimal("100")
                        ),
                    },

                    # Stripe quantity is 1 because
                    # the kg amount is already included
                    # in the price above.
                    "quantity": 1,
                }
            )

        print(
            "LINE ITEMS:",
            line_items
        )

        session = stripe.checkout.Session.create(

            metadata={
                "order_id": str(order.id)
            },

            payment_method_types=[
                "card"
            ],

            line_items=line_items,

            mode="payment",

            success_url=(
                "http://localhost:3000/success"
            ),

            cancel_url=(
                "http://localhost:3000/checkout"
            ),
        )

        return Response(
            {
                "checkout_url": session.url
            }
        )


class CreateOrderView(APIView):

    def post(self, request):

        customer = request.data.get("customer")
        cart = request.data.get("cart")

        if not customer or not cart:

            return Response(
                {
                    "error": (
                        "Customer details and cart "
                        "are required."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        total = Decimal("0.00")

        validated_items = []

        # ----------------------------------------
        # Validate every cart item
        # ----------------------------------------

        for item in cart:

            # Get product FROM DATABASE.
            # We do NOT trust the product information
            # sent by the browser.
            try:

                product = Product.objects.get(
                    id=item["id"]
                )

            except Product.DoesNotExist:

                return Response(
                    {
                        "error": (
                            f"Product {item['id']} "
                            "does not exist."
                        )
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            # ------------------------------------
            # Validate quantity
            # ------------------------------------

            try:

                quantity = Decimal(
                    str(item["quantity"])
                )

            except Exception:

                return Response(
                    {
                        "error": (
                            f"Invalid quantity "
                            f"for {product.name}."
                        )
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            if quantity <= 0:

                return Response(
                    {
                        "error": (
                            f"{product.name} quantity "
                            "must be greater than 0."
                        )
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            # ------------------------------------
            # Check quantity increment
            # ------------------------------------

            increment = product.quantity_increment

            multiples = quantity / increment

            if (
                multiples
                != multiples.to_integral_value()
            ):

                return Response(
                    {
                        "error": (
                            f"{product.name} must be "
                            f"purchased in quantities "
                            f"of {increment} kg."
                        )
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            # ------------------------------------
            # Check stock
            # ------------------------------------

            if quantity > product.stock_kg:

                return Response(
                    {
                        "error": (
                            f"Not enough "
                            f"{product.name} in stock. "
                            f"Available: "
                            f"{product.stock_kg} kg."
                        )
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            # ------------------------------------
            # IMPORTANT:
            # Price comes from Django database.
            #
            # We completely ignore:
            # item["price_per_kg"]
            # from the frontend.
            # ------------------------------------

            price_per_kg = product.price_per_kg

            item_total = (
                price_per_kg *
                quantity
            )

            total += item_total

            validated_items.append(
                {
                    "product": product,
                    "quantity": quantity,
                    "price": price_per_kg,
                }
            )

        # ----------------------------------------
        # Create order
        # ----------------------------------------

        order = Order.objects.create(

            full_name=customer["fullName"],

            email=customer["email"],

            phone=customer["phone"],

            address=customer["address"],

            city=customer["city"],

            postcode=customer["postcode"],

            notes=customer.get(
                "notes",
                ""
            ),

            total_price=total,
        )

        # ----------------------------------------
        # Create order items
        # ----------------------------------------

        for item in validated_items:

            OrderItem.objects.create(

                order=order,

                product=item["product"],

                quantity=item["quantity"],

                price=item["price"],
            )

        return Response(
            {
                "message": "Order created",
                "order_id": order.id
            },
            status=status.HTTP_201_CREATED
        )


@csrf_exempt
def stripe_webhook(request):
    if request.method != "POST":
        return JsonResponse({"error": "Invalid method"}, status=405)

    payload = request.body
    sig_header = request.META.get("HTTP_STRIPE_SIGNATURE")

    try:
        event = stripe.Webhook.construct_event(
            payload,
            sig_header,
            settings.STRIPE_WEBHOOK_SECRET,
        )
    except ValueError:
        return JsonResponse(
            {"error": "Invalid payload"},
            status=400,
        )
    except stripe.error.SignatureVerificationError:
        return JsonResponse(
            {"error": "Invalid signature"},
            status=400,
        )

    if event["type"] != "checkout.session.completed":
        return JsonResponse({"status": "ignored"})

    session = event["data"]["object"]

    # StripeObject does not support normal .get() calls.
    # Use dictionary-style access instead.
    metadata = session["metadata"]
    order_id = metadata["order_id"]

    if not order_id:
        return JsonResponse(
            {"error": "Missing order ID"},
            status=400,
        )

    if session["payment_status"] != "paid":
        return JsonResponse(
            {"status": "payment not completed"}
        )

    try:
        with transaction.atomic():

            # Lock the order so the same order cannot
            # be processed twice at the same time.
            order = (
                Order.objects
                .select_for_update()
                .get(id=order_id)
            )

            # Idempotency check.
            # If Stripe sends the same webhook again,
            # do not deduct stock a second time.
            if order.payment_status == "paid":
                return JsonResponse(
                    {"status": "already processed"}
                )

            # Process every item in the order.
            for item in order.items.all():

                # Lock the product row before checking
                # and changing its stock.
                product = (
                    Product.objects
                    .select_for_update()
                    .get(id=item.product_id)
                )

                quantity = item.quantity

                # Make sure there is still enough stock.
                if quantity > product.stock_kg:
                    return JsonResponse(
                        {
                            "error": (
                                f"Not enough stock for "
                                f"{product.name}"
                            )
                        },
                        status=400,
                    )

                # Deduct stock.
                product.stock_kg -= quantity

                product.save(
                    update_fields=["stock_kg"]
                )

            # Mark the order as paid only after
            # all stock checks and deductions succeed.
            order.payment_status = "paid"
            order.status = "pending"

            order.save(
                update_fields=[
                    "payment_status",
                    "status",
                ]
            )

    except Order.DoesNotExist:
        return JsonResponse(
            {"error": "Order not found"},
            status=404,
        )

    except Product.DoesNotExist:
        return JsonResponse(
            {"error": "Product not found"},
            status=404,
        )

    # Send emails after the database transaction succeeds.
    try:
        send_customer_order_confirmation(order)
        send_owner_new_order_notification(order)
    except Exception as e:
        print(f"Order email failed: {e}")

    return JsonResponse({"status": "success"})