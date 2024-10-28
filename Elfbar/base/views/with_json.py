import json

from django.http import JsonResponse
from django.views import View
from django.contrib import messages
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from ..models import Product
 

@method_decorator(csrf_exempt, name='dispatch')
class CheckForBarcodeView(View):
    def post(self, request):
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
                "product": product_data,
            }
        )


@method_decorator(csrf_exempt, name='dispatch')
class AddSaleView(View):
    def post(self, request):
        data = json.loads(request.body)
        product_id = data.get("product_id")
        amount = int(data.get("amount"))
        
        product = Product.objects.get(id=product_id)
        
        product.amount -= amount
        product.sold_amount += amount
        product.save()
        
        messages.success(request, f'Додано {amount}шт. до {product.producer.name} - {product.name}!')
        return JsonResponse({"status": "success"})


@method_decorator(csrf_exempt, name='dispatch')
class ProductTree(View):
    def get(self, request):
        products = Product.objects.all()
        product_dict = {}
        
        for product in products:
            product_type = product.product_type.name
            producer = product.producer.name
            
            if product_type not in product_dict:
                product_dict[product_type] = {}
                
            if producer not in product_dict[product_type]:
                product_dict[product_type][producer] = {}
            
            
            if product_type in {"Готова жижа", "Самозаміс"}:
                volume = product.volume.amount
                strength = product.strength.amount
                
                if volume not in product_dict[product_type][producer]:
                    product_dict[product_type][producer][volume] = {}
                    
                if strength not in product_dict[product_type][producer][volume]:
                    product_dict[product_type][producer][volume][strength] = []
                    
                product_dict[product_type][producer][volume][strength].append(product.name)
                
            elif product_type == "Одноразка":
                puffs_amount = product.puffs_amount.amount

                if puffs_amount not in product_dict[product_type][producer]:
                    product_dict[product_type][producer][puffs_amount] = []
                
                product_dict[product_type][producer][puffs_amount].append(product.name)
                
            elif product_type == "Картридж":
                resistance = product.resistance.amount
                
                if resistance not in product_dict[product_type][producer]:
                    product_dict[product_type][producer][resistance] = []
                
                product_dict[product_type][producer][resistance].append(product.name)
            
            elif product_type == "Под":
                pod_model = product.pod_model.name
                
                if pod_model not in product_dict[product_type][producer]:
                    product_dict[product_type][producer][pod_model] = []
                    
                product_dict[product_type][producer][pod_model].append(product.name)
                
        return JsonResponse(product_dict)