from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()

    price_per_kg = models.DecimalField(
        max_digits=8,
        decimal_places=2
    )

    stock_kg = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        default=0
    )

    quantity_increment = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=1.50
    )

    image = models.ImageField(
        upload_to='products/',
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name