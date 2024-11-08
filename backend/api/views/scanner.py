from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from ..models import Product


class CheckForBarcodeView(APIView):
    def post(self, request):
        # data = json.loads(request.body)
        # barcode = data.get("barcode")
        barcode = request.GET.get("barcode", 0)

        try:
            # select_related() returns a QuerySet that will “follow” foreign-key ("producer" in our example) relationships,
            # selecting additional related-object data when it executes its query.
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
            return Response(
                data={"status": "error"}, status=status.HTTP_400_BAD_REQUEST
            )

        return Response(
            data={"status": "success", "product": product_data},
            status=status.HTTP_200_OK,
        )
