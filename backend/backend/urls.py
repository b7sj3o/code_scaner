from django.contrib import admin
from rest_framework.routers import DefaultRouter
from django.urls import path, include

from api.views import ProductSaleViewSet

# router = DefaultRouter()
# router.register(r"product_sales", ProductSaleViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("api.urls"))
]
