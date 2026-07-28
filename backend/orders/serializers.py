from rest_framework import serializers
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderItem
        fields = [
            "product",
            "quantity",
            "price",
        ]


class OrderSerializer(serializers.ModelSerializer):

    items = OrderItemSerializer(
        many=True
    )

    class Meta:
        model = Order
        fields = [
            "full_name",
            "email",
            "phone",
            "address",
            "city",
            "postcode",
            "notes",
            "total_price",
            "items",
        ]