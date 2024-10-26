from django import forms
from django.forms import ModelForm

from .models import Product

class ProductForm(ModelForm):
    class Meta:
        model = Product
        fields = "__all__"
        
        
    def __init__(self, *args, **kwargs):
        super(ProductForm, self).__init__(*args, **kwargs)
        
        for _, field in self.fields.items():
            field.widget.attrs["class"] = "form-control"