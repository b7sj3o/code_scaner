
from django.shortcuts import render, redirect
from django.core import serializers
from django.views import View
from django.contrib import messages
from django.db.models import Q
from django.http import JsonResponse
from ..forms import ProductForm
from ..models import Product, Producer, Type
 
 
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
    
    
class ProductSearchView(View):
    def get(self, request):
        search_query = request.GET.get("query", "")
        results = []
        if search_query:
            results = Product.objects.filter(
                Q(name__icontains=search_query) |
                Q(producer__name__icontains=search_query) |
                Q(product_type__name__icontains=search_query) |
                Q(volume__amount__icontains=search_query) |
                Q(strength__amount__icontains=search_query) |
                Q(puffs_amount__amount__icontains=search_query) |
                Q(resistance__amount__icontains=search_query) |
                Q(pod_model__name__icontains=search_query)
            ).values(
                "id", "name", "amount", "product_type__name", "producer__name", "barcode", 
                "sell_price", "volume__amount", "strength__amount", 
                "puffs_amount__amount", "resistance__amount", "pod_model__name"
            )
        # results_json = serializers.serialize("json", results)
        # print(results_json)
        
        return JsonResponse({"results": list(results)})


class ProductsArrival(View):
    def get(self, request):
        
        context = {
            
        }
        
        return render(request, "add-products.html", context) 
        
    def post(self, request):
        ...
 
    
def filter_producers(request):
    product_type = request.GET.get("product_type")
    product_type_model = Type.objects.filter(name=product_type).first()
    
    
    if product_type_model:
        producers_filtered = Producer.objects.filter(producer_type=product_type_model).values("id", "name")
    else:
        producers_filtered = []
        
        
    return JsonResponse({"producers": list(producers_filtered)})