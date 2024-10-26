from django.contrib import admin
from .models import Product, Type, Location, Producer


models_db = [Product, Type, Location, Producer]

for model in models_db:
    admin.site.register(model)


