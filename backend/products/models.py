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
        decimal_places=1,
        default=0
    )

    image = models.ImageField(
        upload_to='products/',
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name