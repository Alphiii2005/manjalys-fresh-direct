from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Order, OrderItem
from products.models import Product


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
