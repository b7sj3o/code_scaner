from django.urls import path
from .views import (
    HomeView,
    ProductView,
    CheckForBarcodeView,
    AddSaleView,
    ProductTreeView,
    GetProductView,
    ProductSearchView,
    ProductsArrival,
    
    filter_producers,
)

urlpatterns = [
    path("", HomeView.as_view(), name="home"),
    path("check-barcode", CheckForBarcodeView.as_view(), name="check-barcode"),
    path("add-sale", AddSaleView.as_view(), name="add-sale"),
    path("create-product", ProductView.as_view(), name="create-product"),
    path("product-tree", ProductTreeView.as_view(), name="product-tree"),
    path("get-product/<int:pk>", GetProductView.as_view(), name="get-product"),
    path("filter-producers", filter_producers, name="filter-producers"),
    path('search-products/', ProductSearchView.as_view(), name='search-products'),
    path("products-arrival", ProductsArrival.as_view(), name="products-arrival")
]
