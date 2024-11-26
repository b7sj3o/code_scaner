from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from ..models import Product


class CheckForBarcodeView(APIView):
    def post(self, request):
        # data = json.loads(request.body)
        # barcode = data.get("barcode")
        barcode = request.data.get("barcode")
        print(barcode)

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
                "producer": product.producer.value,
            }
        except Exception as ex:
            return Response(
                data={"message": f"{ex}"}, status=status.HTTP_400_BAD_REQUEST
            )

        return Response(
            data=product_data,
            status=status.HTTP_200_OK,
        )
