from django.urls import path
from .views import (
    ListProductsView,
    CreateProductView,
    ProductTreeView,
    ProductForeignKeysView,
    CheckForBarcodeView,
    AddSaleView,
    ProducerView,
    ProductTypeView,
    PodModelView,
    AddProductArrivalView,
    AddProductOptView,
    ProductSaleViewSet,
    sales_summary
)

urlpatterns = [
    path("create-product/", CreateProductView.as_view(), name="create-product"),
    path("add-sale/", AddSaleView.as_view(), name="add-sale"),
    path("check-barcode/", CheckForBarcodeView.as_view(), name="check-barcode"),
    
    path("product-foreign-keys/", ProductForeignKeysView.as_view(), name="product-foreign-keys"),
    path("products/", ListProductsView.as_view(), name="products"),
    path("product-tree/", ProductTreeView.as_view(), name="product-tree"),
    path("product-types/", ProductTypeView.as_view(), name="product-types"),
    path("producers/", ProducerView.as_view(), name="producers"),
    path("pod-models/", PodModelView.as_view(), name="pod-models"),
    path("add-arrival/", AddProductArrivalView.as_view(), name="add-arrival"),
    path("add-opt/", AddProductOptView.as_view(), name="add-opt"),
    path("sales_summary/", sales_summary, name="sales_summary"),
    path("product_sales/", ProductSaleViewSet.as_view({'get': 'list'}), name="product_sales"),
]