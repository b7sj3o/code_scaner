from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from ..models import Product
from ..serializers import AddSaleSerializer


class AddSaleView(APIView):
    def post(self, request):
        try:
            serializer = AddSaleSerializer(data=request.data)

            if serializer.is_valid():
                product_id = serializer.validated_data['product_id']
                amount = serializer.validated_data['amount']
                
                product = Product.objects.get(id=product_id)

                if product.amount < amount:
                    return Response(
                        data={
                            "message": f"Помилка: В наявності менша к-сть товару, ніж ви хочете продати",
                        },
                        status=status.HTTP_403_FORBIDDEN
                    )
                    
                product.amount -= amount
                product.sold_amount += amount
                product.save()

                return Response(
                    data={
                        "message": f"Додано {amount}шт. до {product.producer.name} - {product.name}!",
                    },
                    status=status.HTTP_200_OK
                )
        except Exception as ex:
            return Response(
                data={
                    "message": f"Помилка: {ex}",
                },
                status=status.HTTP_200_OK
            )
