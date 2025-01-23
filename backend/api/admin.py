from django.db.models import Q
from django.contrib import admin
from .models import (
    Product,
    ProductType,
    Producer,
    PuffsAmount,
    LiquidStrength,
    LiquidVolume,
    CartridgeResistance,
    PodModel,
    ProductSale
)


models_db = [
    # Product,
    ProductType,
    Producer,
    PuffsAmount,
    LiquidStrength,
    LiquidVolume,
    CartridgeResistance,
    PodModel,
    ProductSale,
]

for model in models_db:
    admin.site.register(model)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    # Поля для відображення в таблиці
    list_display = (
        "id",
        "product_type",
        "producer",
        "name",
        "buy_price",
        "sell_price",
        "drop_sell_price",
        "amount",
    )
    
    # Поля для пошуку
    search_fields = ("name", "barcode")

    # Фільтри
    list_filter = ("product_type", "producer")
    
