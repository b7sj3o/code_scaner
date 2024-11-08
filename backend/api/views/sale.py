from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from ..models import Product


class AddSaleView(APIView):
    def post(self, request):
        product_id = request.GET.get("product_id", None)
        amount = int(request.GET.get("amount", 0))

        product = Product.objects.get(id=product_id)

        product.amount -= amount
        product.sold_amount += amount
        product.save()

        return Response(
            data={
                "status": "success",
                "message": f"Додано {amount}шт. до {product.producer.name} - {product.name}!",
            },
            status=status.HTTP_200_OK
        )
