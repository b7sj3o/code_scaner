from django.urls import path
from .views import (
    HomeView,
    ProductView,
    CheckForBarcodeView,
    AddSaleView,
    ProductTree,
)

urlpatterns = [
    path("", HomeView.as_view(), name="home"),
    path("check_for_barcode", CheckForBarcodeView.as_view(), name="check_for_barcode"),
    path("add_sale", AddSaleView.as_view(), name="add_sale"),
    path("create_product", ProductView.as_view(), name="create_product"),
    path("product_tree", ProductTree.as_view(), name="product_tree"),
]
