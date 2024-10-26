from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("check_for_barcode", views.check_for_barcode, name="check_for_barcode"),
    path("add_sale", views.add_sale, name="add_sale"),
    path("create_product", views.create_product, name="create_product"),
]
