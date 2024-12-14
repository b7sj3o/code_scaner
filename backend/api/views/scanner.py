from django.forms.models import model_to_dict
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from ..models import Product


class CheckForBarcodeView(APIView):
    def get(self, request):
        barcode = request.GET.get("barcode")


        try:
            # select_related() returns a QuerySet that will “follow” foreign-key ("producer" in our example) relationships,
            # selecting additional related-object data when it executes its query.
            product = Product.objects.select_related(
                "product_type",
                "producer",
                "pod_model",
                "puffs_amount",
                "resistance",
                "strength",
                "volume",
            ).get(barcode=barcode)

            product_data = model_to_dict(product)

            product_data["product_type"] = product.product_type.value if product.product_type else None
            product_data["producer"] = product.producer.value if product.producer else None
            product_data["pod_model"] = product.pod_model.value if product.pod_model else None
            product_data["puffs_amount"] = product.puffs_amount.value if product.puffs_amount else None
            product_data["resistance"] = product.resistance.value if product.resistance else None
            product_data["strength"] = product.strength.value if product.strength else None
            product_data["volume"] = product.volume.value if product.volume else None        
            
            
        except Exception as ex:
            return Response(
                data={"message": f"An error occured: {ex}"}, status=status.HTTP_400_BAD_REQUEST
            )

        return Response(
            data=product_data,
            status=status.HTTP_200_OK,
        )
