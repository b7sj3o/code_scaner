from django.urls import path
from .views import (
    HomeView,
    ProductView,
    CheckForBarcodeView,
    AddSaleView,
    ProductTreeView,
    ProductFilterView,
    FilterProducersView
)

urlpatterns = [
    path("home/", HomeView.as_view(), name="home"),
    path("create-product/", ProductView.as_view(), name="create-product"),
    path("add-sale/", AddSaleView.as_view(), name="add-sale"),
    path("check-barcode/", CheckForBarcodeView.as_view(), name="check-barcode"),
    path("product-tree/", ProductTreeView.as_view(), name="product-tree"),
    path('search-products/', ProductFilterView.as_view(), name='search-products'),
    path("filter-producers/", FilterProducersView.as_view(), name="filter-producers"),
]