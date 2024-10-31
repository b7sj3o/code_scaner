from django import forms
from django.forms import ModelForm

from .models import Product

class ProductForm(ModelForm):
    class Meta:
        model = Product
        exclude = ("sold_amount", "drop_sold_amount", "is_drop")
        
        
    def __init__(self, *args, **kwargs):
        super(ProductForm, self).__init__(*args, **kwargs)
        
        for field_name, field in self.fields.items():
            if isinstance(field, forms.IntegerField):
                field.widget = forms.NumberInput(attrs={
                    "type": "tel",
                    "id": field_name,
                    "class": "form-control"
                })
            else:
                field.widget.attrs["id"] = field_name
                field.widget.attrs["class"] = "form-control"
