from django.contrib import admin
from .models import (
    Product,
    Type,
    Producer,
    PuffsAmount,
    LiquidStrength,
    LiquidVolume,
    CartridgeResistance,
    PodModel,
)


models_db = [
    Product,
    Type,
    Producer,
    PuffsAmount,
    LiquidStrength,
    LiquidVolume,
    CartridgeResistance,
    PodModel,
]

for model in models_db:
    admin.site.register(model)
