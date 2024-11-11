from django.urls import path
from .views import (
    ProductView,
    CheckForBarcodeView,
    AddSaleView,
    ProductTreeView,
    ProductFilterView,
    ProducerView,
    ProductTypeView,
    PodModelView
)

urlpatterns = [
    path("create-product/", ProductView.as_view(), name="create-product"),
    path("add-sale/", AddSaleView.as_view(), name="add-sale"),
    path("check-barcode/", CheckForBarcodeView.as_view(), name="check-barcode"),
    path("product-tree/", ProductTreeView.as_view(), name="product-tree"),
    path('filter-products/', ProductFilterView.as_view(), name='filter-products'),
    
    path("products/", ProductView.as_view(), name="products"),
    path("product-types/", ProductTypeView.as_view(), name="product-types"),
    path("producers/", ProducerView.as_view(), name="producers"),
    path("pod-models/", PodModelView.as_view(), name="pod-models"),
]