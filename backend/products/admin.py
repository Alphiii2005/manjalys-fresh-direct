from django.contrib import admin

from .models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):

    # =========================================================
    # PRODUCT LIST
    # =========================================================

    list_display = (
        "name",
        "price_per_kg",
        "stock_kg",
        "quantity_increment",
        "stock_status",
        "created_at",
    )

    # =========================================================
    # FILTERS
    # =========================================================

    list_filter = (
        "created_at",
    )

    # =========================================================
    # SEARCH
    # =========================================================

    search_fields = (
        "name",
        "description",
    )

    # =========================================================
    # ORDERING
    # =========================================================

    ordering = (
        "name",
    )

    # =========================================================
    # EDITABLE FIELDS
    # =========================================================

    readonly_fields = (
        "created_at",
    )

    # =========================================================
    # PRODUCT PAGE
    # =========================================================

    fieldsets = (

        (
            "Product Information",
            {
                "fields": (
                    "name",
                    "description",
                    "image",
                )
            }
        ),

        (
            "Pricing",
            {
                "fields": (
                    "price_per_kg",
                )
            }
        ),

        (
            "Stock & Quantity",
            {
                "fields": (
                    "stock_kg",
                    "quantity_increment",
                )
            }
        ),

        (
            "System Information",
            {
                "fields": (
                    "created_at",
                )
            }
        ),
    )

    # =========================================================
    # STOCK STATUS
    # =========================================================

    @admin.display(
        description="Stock Status"
    )
    def stock_status(self, obj):

        if obj.stock_kg <= 0:

            return "🔴 OUT OF STOCK"

        elif obj.stock_kg <= 5:

            return "🟠 LOW STOCK"

        else:

            return "🟢 IN STOCK"