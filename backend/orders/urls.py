from django.urls import path
from .views import (
    CreateOrderView,
    CreateCheckoutSessionView,
    stripe_webhook
)



urlpatterns = [
    path("", CreateOrderView.as_view()),

    path(
        "checkout/",
        CreateCheckoutSessionView.as_view()
    ),
     path(
        "webhook/",
         stripe_webhook
    ),
]