from django.shortcuts import render
from django.views import View

from ..models import Type

class HomeView(View):
    def get(self, request):
        product_types = Type.objects.all()
    
        context = {
            "product_types": product_types
        }
        
        return render(request, "index.html", context=context)
   