from django.urls import path
from .views import (
    HomeView,
    ProductView,
    CheckForBarcodeView,
    AddSaleView,
    ProductTreeView,
    GetProductView
)

urlpatterns = [
    path("", HomeView.as_view(), name="home"),
    path("check_for_barcode", CheckForBarcodeView.as_view(), name="check_for_barcode"),
    path("add_sale", AddSaleView.as_view(), name="add_sale"),
    path("create_product", ProductView.as_view(), name="create_product"),
    path("product_tree", ProductTreeView.as_view(), name="product_tree"),
    path("get_product/<int:pk>", GetProductView.as_view(), name="get_product"),
]
