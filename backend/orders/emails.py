from django.conf import settings
from django.core.mail import send_mail


def send_customer_order_confirmation(order):

    subject = (
        f"Order #{order.id} confirmed - "
        "Manjaly's Fresh Direct"
    )

    items_text = ""

    for item in order.items.select_related(
        "product"
    ).all():

        item_total = item.price * item.quantity

        items_text += (
            f"\n"
            f"{item.product.name}\n"
            f"Quantity: {item.quantity} kg\n"
            f"Price per kg: £{item.price}\n"
            f"Item total: £{item_total:.2f}\n"
        )

    message = f"""
Hello {order.full_name},

Thank you for ordering from Manjaly's Fresh Direct!

Your payment has been successfully received and your order
has been confirmed.

ORDER #{order.id}

ITEMS
{items_text}

TOTAL: £{order.total_price:.2f}

DELIVERY ADDRESS

{order.address}
{order.city}
{order.postcode}

We will keep you updated as your order progresses.

Thank you,
Manjaly's Fresh Direct
"""

    return send_mail(
        subject=subject,
        message=message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[order.email],
        fail_silently=False,
    )


def send_owner_new_order_notification(order):

    subject = (
        f"NEW ORDER #{order.id} - "
        f"£{order.total_price:.2f}"
    )

    items_text = ""

    for item in order.items.select_related(
        "product"
    ).all():

        item_total = item.price * item.quantity

        items_text += (
            f"\n"
            f"{item.product.name}\n"
            f"Quantity: {item.quantity} kg\n"
            f"Item total: £{item_total:.2f}\n"
        )

    message = f"""
NEW ORDER RECEIVED

ORDER #{order.id}

CUSTOMER

Name: {order.full_name}
Email: {order.email}
Phone: {order.phone}


ITEMS
{items_text}


TOTAL: £{order.total_price:.2f}


DELIVERY ADDRESS

{order.address}
{order.city}
{order.postcode}


NOTES

{order.notes or "No notes provided."}
"""

    return send_mail(
        subject=subject,
        message=message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[settings.OWNER_EMAIL],
        fail_silently=False,
    )