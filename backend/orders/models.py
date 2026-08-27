from django.db import models

from products.models import Product


# =========================================================
# ORDER
# =========================================================

class Order(models.Model):

    # -----------------------------------------------------
    # ORDER FULFILMENT STATUS
    # -----------------------------------------------------

    STATUS_CHOICES = [

        ("pending", "Pending"),

        ("confirmed", "Confirmed"),

        ("preparing", "Preparing"),

        ("delivery", "Out for Delivery"),

        ("completed", "Completed"),

        ("cancelled", "Cancelled"),

    ]


    # -----------------------------------------------------
    # PAYMENT STATUS
    # -----------------------------------------------------

    PAYMENT_STATUS = [

        ("unpaid", "Unpaid"),

        ("paid", "Paid"),

        ("failed", "Failed"),

    ]


    # -----------------------------------------------------
    # CUSTOMER INFORMATION
    # -----------------------------------------------------

    full_name = models.CharField(
        max_length=100
    )

    email = models.EmailField()

    phone = models.CharField(
        max_length=20
    )


    # -----------------------------------------------------
    # DELIVERY INFORMATION
    # -----------------------------------------------------

    address = models.CharField(
        max_length=255
    )

    city = models.CharField(
        max_length=100
    )

    postcode = models.CharField(
        max_length=20
    )

    notes = models.TextField(
        blank=True
    )


    # -----------------------------------------------------
    # PRICING
    # -----------------------------------------------------

    total_price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )


    # -----------------------------------------------------
    # STATUSES
    # -----------------------------------------------------

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending"
    )

    payment_status = models.CharField(
        max_length=20,
        choices=PAYMENT_STATUS,
        default="unpaid"
    )


    # -----------------------------------------------------
    # TIMESTAMPS
    # -----------------------------------------------------

    created_at = models.DateTimeField(
        auto_now_add=True
    )


    def __str__(self):

        return f"Order #{self.id} - {self.full_name}"


# =========================================================
# ORDER ITEM
# =========================================================

class OrderItem(models.Model):

    order = models.ForeignKey(
        Order,
        related_name="items",
        on_delete=models.CASCADE
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )

    quantity = models.DecimalField(
        max_digits=6,
        decimal_places=2
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )


    def __str__(self):

        return (
            f"{self.product.name} "
            f"({self.quantity} kg)"
        )