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
    Product,
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
