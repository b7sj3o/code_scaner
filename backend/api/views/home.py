from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import Type
from ..serializers import TypeSerializer

class HomeView(APIView):
    def get(self, request):
        product_types = Type.objects.all()
        serializer = TypeSerializer(product_types, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
