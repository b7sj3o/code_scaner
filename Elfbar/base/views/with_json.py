import json
from collections import defaultdict
from django.http import JsonResponse
from django.views import View
from django.core import serializers
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from ..models import Product


@method_decorator(csrf_exempt, name="dispatch")
class CheckForBarcodeView(View):
    def post(self, request):
        data = json.loads(request.body)
        barcode = data.get("barcode")

        try:
            product = Product.objects.select_related("producer").get(
                barcode=int(barcode)
            )
            product_data = {
                "id": product.id,
                "name": product.name,
                "amount": product.amount,
                "producer": product.producer.name,
            }
        except:
            return JsonResponse({"status": "error"})

        return JsonResponse(
            {
                "status": "success",
                "product": product_data,
            }
        )


@method_decorator(csrf_exempt, name="dispatch")
class AddSaleView(View):
    def post(self, request):
        data = json.loads(request.body)
        product_id = data.get("product_id")
        amount = int(data.get("amount"))

        product = Product.objects.get(id=product_id)

        product.amount -= amount
        product.sold_amount += amount
        product.save()

        return JsonResponse({"status": "success", "message": f"Додано {amount}шт. до {product.producer.name} - {product.name}!"})


@method_decorator(csrf_exempt, name="dispatch")
class ProductTreeView(View):
    # TODO: нахуй все переписати нормально
    def get(self, request):
        products = Product.objects.all()
        product_dict = defaultdict(
            lambda: defaultdict(
                lambda: defaultdict(list)
            )
        )

        for product in products:
            product_type = product.product_type.name
            producer = product.producer.name
            product_info = {
                "id": product.id,
                "name": product.name,
                "barcode": product.barcode,
                "amount": product.amount,
                "sold_amount": product.sold_amount,
                "buy_price": product.buy_price,
                "sell_price": product.sell_price
            }

            if product_type in {"Готова жижа", "Самозаміс"}:
                volume = product.volume.amount
                strength = product.strength.amount

                product_dict[product_type][producer][volume] = defaultdict(list)
                product_dict[product_type][producer][volume][strength].append(product_info)

            elif product_type == "Одноразка":
                puffs_amount = product.puffs_amount.amount
                product_dict[product_type][producer][puffs_amount].append(product_info)

            elif product_type == "Картридж":
                resistance = product.resistance.amount
                product_dict[product_type][producer][resistance].append(product_info)

            elif product_type == "Под":
                pod_model = product.pod_model.name
                product_dict[product_type][producer][pod_model].append(product_info)

        return JsonResponse(product_dict)


@method_decorator(csrf_exempt, name="dispatch")
class GetProductView(View):
    def get(self, request, pk):
        # filter для того, щоб обгорнути product в QuerySet
        product = Product.objects.filter(id=pk)
        
        return JsonResponse(serializers.serialize("json", product), safe=False)
