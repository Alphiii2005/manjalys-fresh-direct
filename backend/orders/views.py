import stripe

from django.conf import settings

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json

from .models import Order, OrderItem
from products.models import Product


stripe.api_key = settings.STRIPE_SECRET_KEY



class CreateCheckoutSessionView(APIView):

    def post(self, request):

        order_id = request.data["order_id"]

        order = Order.objects.get(
            id=order_id
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


            # Stripe does not support decimal quantities
            # so we convert the kg amount into the final price

            final_price = (
                float(item.price)
                *
                float(item.quantity)
            )


            line_items.append(
                {
                    "price_data": {

                        "currency": "gbp",

                        "product_data": {
                            "name": f"{item.product.name} ({item.quantity}kg)",
                        },

                        "unit_amount": int(
                            final_price * 100
                        ),
                    },


                    "quantity": 1,
                }
            )


        print("LINE ITEMS:", line_items)



        session = stripe.checkout.Session.create(

            metadata={
                "order_id": order.id
            },

            payment_method_types=[
                "card"
            ],


            line_items=line_items,


            mode="payment",


            success_url=
            "http://localhost:3000/success",


            cancel_url=
            "http://localhost:3000/checkout",
        )



        return Response(
            {
                "checkout_url": session.url
            }
        )





class CreateOrderView(APIView):

    def post(self, request):

        customer = request.data["customer"]

        cart = request.data["cart"]



        total = 0


        for item in cart:

            total += (
                float(item["price_per_kg"])
                *
                float(item["quantity"])
            )



        order = Order.objects.create(

            full_name=customer["fullName"],

            email=customer["email"],

            phone=customer["phone"],

            address=customer["address"],

            city=customer["city"],

            postcode=customer["postcode"],

            notes=customer["notes"],

            total_price=total,
        )



        for item in cart:


            product = Product.objects.get(
                id=item["id"]
            )


            OrderItem.objects.create(

                order=order,

                product=product,

                quantity=item["quantity"],

                price=item["price_per_kg"],
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

    payload = request.body

    event = json.loads(payload)


    if event["type"] == "checkout.session.completed":

        session = event["data"]["object"]


        order_id = session["metadata"]["order_id"]


        order = Order.objects.get(
            id=order_id
        )


        order.payment_status = "paid"

        order.status = "pending"

        order.save()


    return JsonResponse(
        {
            "status": "success"
        }
    )