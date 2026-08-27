from orders.models import Order
from products.models import Product


def admin_dashboard(request):

    total_orders = Order.objects.count()

    paid_orders = Order.objects.filter(
        payment_status="paid"
    ).count()

    pending_orders = Order.objects.filter(
        status="pending"
    ).count()

    low_stock_products = Product.objects.filter(
        stock_kg__gt=0,
        stock_kg__lte=10
    ).count()

    out_of_stock_products = Product.objects.filter(
        stock_kg__lte=0
    ).count()

    recent_orders = (
        Order.objects
        .order_by("-created_at")[:5]
    )

    return {
        "dashboard_total_orders": total_orders,
        "dashboard_paid_orders": paid_orders,
        "dashboard_pending_orders": pending_orders,
        "dashboard_low_stock_products": low_stock_products,
        "dashboard_out_of_stock_products": out_of_stock_products,
        "dashboard_recent_orders": recent_orders,
    }