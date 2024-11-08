from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from ..models import Producer, Type

class FilterProducersView(APIView):
    def get(self, request):
        product_type = request.GET.get("product_type")
        product_type_model = Type.objects.filter(name=product_type).first()
    
        if product_type_model:
            producers_filtered = Producer.objects.filter(producer_type=product_type_model).values("id", "name")
        else:
            producers_filtered = []
        
        return Response(data={"producers": list(producers_filtered)}, status=status.HTTP_200_OK)
