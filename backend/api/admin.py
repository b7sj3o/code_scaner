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
]

for model in models_db:
    admin.site.register(model)
