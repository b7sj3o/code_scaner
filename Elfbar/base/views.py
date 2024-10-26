import json

from django.core import serializers
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from django.contrib import messages

from .forms import ProductForm
from .models import Product, Producer


def home(request):
     return render(request, "index.html")


@csrf_exempt
def check_for_barcode(request):
    if request.method == "POST":
        data = json.loads(request.body)
        barcode = data.get("barcode")
    
        try:
            product = Product.objects.select_related('producer').get(barcode=int(barcode))
            product_data = {
                "id": product.id,
                "name": product.name,
                "amount": product.amount,
                "producer": product.producer.name
            }
        except:
            return JsonResponse({"status": "error"})

        return JsonResponse(
            {
                "status": "success",
                "products": product_data,
            }
        )

    return JsonResponse({"status": "error"})


@csrf_exempt
def add_sale(request):
    if request.method == "POST":
        data = json.loads(request.body)
        
        product_id = data.get("product_id")
        amount = int(data.get("amount"))
        
        product = Product.objects.get(id=product_id)
        
        product.amount -= amount
        product.sold_amount += amount
        product.save()
        
        messages.success(request, f'Додано {amount}шт. до {product.producer.name} - {product.name}!')
        return JsonResponse({"status": "success"})
    

def create_product(request):
    barcode = request.GET.get("barcode")
    form = ProductForm(initial={'barcode': barcode})
    
    if request.method == "POST":
        form = ProductForm(request.POST)
        
        if form.is_valid():
            form.save()
            
            messages.success(request, 'Продукт успішно створено!')
            return redirect("home")
        
        return redirect("create_product")
    
    context = {
        "form": form
    }
    
    return render(request, "create-product.html", context=context)
