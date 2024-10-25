from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("check_for_barcode", views.check_for_barcode, name="check_for_barcode")
]
