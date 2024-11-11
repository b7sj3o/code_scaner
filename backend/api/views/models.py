from rest_framework import status

from rest_framework.views import APIView
from rest_framework.response import Response

from ..models import ProductType, Producer, PodModel
from ..serializers import ProductTypeSerializer, ProducerSerializer, PodModelSerializer


class ProductTypeView(APIView):    
    def get(self, request):
        product_types = ProductType.objects.all()
        serializer = ProductTypeSerializer(product_types, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    
class ProducerView(APIView):
    def get(self, request):
        producers = Producer.objects.select_related("producer_type").all()
        serializer = ProducerSerializer(producers, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    
    
class PodModelView(APIView):
    def get(self, request):
        pod_models = PodModel.objects.all()
        serializer = PodModelSerializer(pod_models, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
