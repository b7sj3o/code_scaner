from rest_framework import status

from rest_framework.views import APIView
from rest_framework.response import Response

from ..models import Product
from ..serializers import ProductSerializer
from django.db.models import Q
from collections import defaultdict

class ProductView(APIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    def post(self, request):
        data = request.data
        serializer = ProductSerializer(data=data)
        if serializer.is_valid():
            product = serializer.save()
            product.name = product.name.lower()
            product.save()
            return Response(data={"message": "Продукт успішно створено!"}, status=status.HTTP_200_OK)
        
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductFilterView(APIView):
    def get(self, request):
        search_query = request.GET.get("query", "")
        results = []
        
        if search_query:
            search_keywords = [kw.lower() for kw in search_query.split()]
            q_objects = Q()
            
            for keyword in search_keywords:
                q_objects &= (
                    Q(name__icontains=keyword) |
                    Q(producer__name__icontains=keyword) |
                    Q(product_type__name__icontains=keyword) |
                    Q(volume__amount__icontains=keyword) |
                    Q(strength__amount__icontains=keyword) |
                    Q(puffs_amount__amount__icontains=keyword) |
                    Q(resistance__amount__icontains=keyword) |
                    Q(pod_model__name__icontains=keyword)
                )
                
            results = Product.objects.filter(q_objects).values(
                    "id", "name", "amount", "product_type__name", "producer__name", "barcode", 
                    "sell_price", "volume__amount", "strength__amount", 
                    "puffs_amount__amount", "resistance__amount", "pod_model__name"
                )
        
        return Response(data={"results": list(results)}, status=status.HTTP_200_OK)


class ProductTreeView(APIView):
    def get(self, request):
        products = Product.objects.all()
        product_dict = defaultdict(
            lambda: defaultdict(
                lambda: defaultdict(list)
            )
        )

        for product in products:
            product_type = product.product_type.name.lower()
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

            if product_type in {"готова жижа", "самозаміс"}:
                volume = product.volume.amount
                strength = product.strength.amount

                product_dict[product_type][producer][volume] = defaultdict(list)
                product_dict[product_type][producer][volume][strength].append(product_info)

            elif product_type == "одноразка":
                puffs_amount = product.puffs_amount.amount
                product_dict[product_type][producer][puffs_amount].append(product_info)

            elif product_type == "картридж":
                resistance = product.resistance.amount
                product_dict[product_type][producer][resistance].append(product_info)

            elif product_type == "под":
                pod_model = product.pod_model.name
                product_dict[product_type][producer][pod_model].append(product_info)

        return Response(data=product_dict, status=status.HTTP_200_OK)
