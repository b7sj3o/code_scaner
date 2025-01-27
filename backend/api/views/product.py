import json
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, ListAPIView, CreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q, F
from collections import defaultdict

from ..models import (
    Producer,
    Product,
    ProductSale,
    ProductType,
    PodModel,
    PuffsAmount,
    CartridgeResistance,
    LiquidStrength,
    LiquidVolume,
)
from ..serializers import GetProductSerializer, CreateProductSerializer


class ListProductsView(ListAPIView):
    queryset = Product.objects.select_related(
        "product_type",
        "producer",
        "pod_model",
        "puffs_amount",
        "resistance",
        "strength",
        "volume",
    ).all()
    serializer_class = GetProductSerializer


class CreateProductView(CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = CreateProductSerializer

    # TODO: maybe it's not needed
    def perform_create(self, serializer):
        serializer.save()

    def create(self, request, *args, **kwargs):
        try:
            response = super().create(request, *args, **kwargs)
            product_name = response.data.get("name", "")
            return Response(
                data={"message": f"Продукт '{product_name}' успішно створено!"},
                status=status.HTTP_201_CREATED,
            )
        except Exception as ex:
            print(ex)
            return Response(
                data={"message": f"Помилка при створенні продукту: {ex}"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class ProductForeignKeysView(APIView):

    def get(self, request):
        data = {
            "product_types": list(ProductType.objects.values("id", "value")),
            "producers": list(Producer.objects.values("id", "value", "producer_type__value")),
            "volumes": list(LiquidVolume.objects.values("id", "value")),
            "strengths": list(LiquidStrength.objects.values("id", "value")),
            "puffs_amounts": list(PuffsAmount.objects.values("id", "value")),
            "resistances": list(CartridgeResistance.objects.values("id", "value")),
            "pod_models": list(PodModel.objects.values("id", "value")),
        }

        return Response(data=data, status=status.HTTP_200_OK)


class ProductTreeView(APIView):
    def get(self, request):
        products = Product.objects.all()
        product_dict = defaultdict(lambda: defaultdict(lambda: defaultdict(list)))

        for product in products:
            try:
                product_type = product.product_type.value
                producer = product.producer.value

                product_info = {
                    "id": product.id,
                    "name": product.name,
                    "barcode": product.barcode,
                    "amount": product.amount,
                    "buy_price": product.buy_price,
                    "sell_price": product.sell_price,
                }

                if product_type in {"Готова жижа", "Самозаміс"}:
                    volume = product.volume.value
                    strength = product.strength.value

                    if not product_dict[product_type][producer][volume]:
                        product_dict[product_type][producer][volume] = defaultdict(list)

                    product_dict[product_type][producer][volume][strength].append(
                        product_info
                    )

                elif product_type == "Одноразка":
                    puffs_amount = product.puffs_amount.value
                    product_dict[product_type][producer][puffs_amount].append(product_info)

                elif product_type == "Картридж":
                    resistance = product.resistance.value
                    product_dict[product_type][producer][resistance].append(product_info)

                elif product_type == "Под":
                    pod_model = product.pod_model.value
                    product_dict[product_type][producer][pod_model].append(product_info)
                
            except:
                continue

        return Response(data=product_dict, status=status.HTTP_200_OK)


class AddProductArrivalView(APIView):
    def post(self, request):
        products = request.data.get("products")

        try:
            for product in products:
                id, price, amount = product["id"], product["price"], product["amount"]
                existing_product = Product.objects.get(id=id)

                if existing_product.buy_price != price:
                    existing_product.update_buy_price(
                        new_buy_price=price,
                        new_amount=amount
                    )
                
                existing_product.amount = F('amount') + amount

                existing_product.save()

            return Response(data={"success": True, "data": "Success!!"}, status=status.HTTP_200_OK)
        except Exception as ex:
            return Response(data={"success": False, "data": f"Error: {ex}"}, status=status.HTTP_400_BAD_REQUEST)
            

class AddProductOptView(APIView):
    def post(self, request):
        products = request.data.get("products")

        try:
            for product in products:
                id, price, amount = product["id"], product["price"], product["amount"]

                existing_product = Product.objects.get(id=id)

                if existing_product.amount < amount:
                    return Response(data={"success": False, "message": f"Not enough stock for product ({existing_product.name}, {existing_product.producer.value})"}, status=status.HTTP_400_BAD_REQUEST)

                existing_product.amount -= amount

                ProductSale.objects.create(
                    product=existing_product,
                    sell_price = price,
                    amount=amount
                )

                existing_product.save()

            return Response(data={"success": True, "message": "Success!!"}, status=status.HTTP_200_OK)
        except Product.DoesNotExist:
            return Response(data={"success": False, "message": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as ex:
            return Response(data={"success": False, "message": f"Error: {ex}"}, status=status.HTTP_400_BAD_REQUEST)
   
