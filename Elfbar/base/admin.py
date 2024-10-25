from django.contrib import admin
from .models import Product, Type


models_db = [Product, Type]

for model in models_db:
    admin.site.register(model)


