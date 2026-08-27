from django.contrib import admin
from django.utils.html import format_html

from .models import Order, OrderItem


# =========================================================
# ORDER ITEMS INLINE
# =========================================================

class OrderItemInline(admin.TabularInline):

    model = OrderItem
    extra = 0

    readonly_fields = (
        "product",
        "quantity",
        "price",
        "item_total",
    )

    fields = (
        "product",
        "quantity",
        "price",
        "item_total",
    )

    def item_total(self, obj):

        if obj.pk:
            return obj.price * obj.quantity

        return 0

    item_total.short_description = "Total"


# =========================================================
# ORDER ADMIN
# =========================================================

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "full_name",
        "email",
        "total_price",
        "payment_status_badge",
        "status_badge",
        "created_at",
    )

    list_filter = (
        "payment_status",
        "status",
        "created_at",
    )

    search_fields = (
        "full_name",
        "email",
        "phone",
        "postcode",
    )

    ordering = (
        "-created_at",
    )

    inlines = [
        OrderItemInline
    ]

    readonly_fields = (
        "total_price",
        "created_at",
    )

    fieldsets = (

        (
            "Customer Information",
            {
                "fields": (
                    "full_name",
                    "email",
                    "phone",
                )
            }
        ),

        (
            "Delivery Information",
            {
                "fields": (
                    "address",
                    "city",
                    "postcode",
                )
            }
        ),

        (
            "Order Information",
            {
                "fields": (
                    "status",
                    "payment_status",
                    "total_price",
                    "notes",
                    "created_at",
                )
            }
        ),
    )

    # =====================================================
    # PAYMENT STATUS BADGE
    # =====================================================

    @admin.display(
        description="Payment",
        ordering="payment_status",
    )
    def payment_status_badge(self, obj):

        if obj.payment_status == "paid":

            return format_html(
                '<span style="color:#155724; '
                'background:#d4edda; '
                'padding:4px 10px; '
                'border-radius:12px; '
                'font-weight:bold;">✓ PAID</span>'
            )

        elif obj.payment_status == "failed":

            return format_html(
                '<span style="color:#721c24; '
                'background:#f8d7da; '
                'padding:4px 10px; '
                'border-radius:12px; '
                'font-weight:bold;">✕ FAILED</span>'
            )

        return format_html(
            '<span style="color:#856404; '
            'background:#fff3cd; '
            'padding:4px 10px; '
            'border-radius:12px; '
            'font-weight:bold;">● UNPAID</span>'
        )

    # =====================================================
    # ORDER STATUS BADGE
    # =====================================================

    @admin.display(
        description="Status",
        ordering="status",
    )
    def status_badge(self, obj):

        status_styles = {

            "pending": (
                "#856404",
                "#fff3cd",
                "● PENDING",
            ),

             "confirmed": (
                "#155724",
                "#d4edda",
                "✓ CONFIRMED",
            ),

            "preparing": (
                "#004085",
                "#cce5ff",
                "◉ PREPARING",
            ),

            "delivery": (
                "#0c5460",
                "#d1ecf1",
                "🚚 OUT FOR DELIVERY",
            ),

            "completed": (
                "#155724",
                "#d4edda",
                "✓ COMPLETED",
            ),

            "cancelled": (
                "#721c24",
                "#f8d7da",
                "✕ CANCELLED",
            ),
        }

        text_color, background, label = status_styles.get(
            obj.status,
            (
                "#383d41",
                "#e2e3e5",
                obj.status.upper(),
            )
        )

        return format_html(
            '<span style="color:{}; '
            'background:{}; '
            'padding:4px 10px; '
            'border-radius:12px; '
            'font-weight:bold;">{}</span>',
            text_color,
            background,
            label,
        )


# =========================================================
# ORDER ITEM ADMIN
# =========================================================

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):

    list_display = (
        "order",
        "product",
        "quantity",
        "price",
        "item_total",
    )

    search_fields = (
        "product__name",
        "order__full_name",
        "order__email",
    )

    list_filter = (
        "product",
    )

    readonly_fields = (
        "item_total",
    )

    def item_total(self, obj):

        return obj.price * obj.quantity

    item_total.short_description = "Total"