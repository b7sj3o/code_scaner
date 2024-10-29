
from django.shortcuts import render, redirect
from django.views import View
from django.contrib import messages

from ..forms import ProductForm
from ..models import Product, Producer
 
 
class ProductView(View):
    def get(self, request):
        barcode = request.GET.get("barcode", None)
        form = ProductForm(initial={'barcode': barcode} if barcode else None)
        
        context = {
            "form": form
        }
        
        return render(request, "create-product.html", context=context)
    
    
    def post(self, request):
        form = ProductForm(request.POST)
        
        if form.is_valid():
            form.save()
            messages.success(request, 'Продукт успішно створено!')
            return redirect("home")
        
        return redirect("create_product")
    