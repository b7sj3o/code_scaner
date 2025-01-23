import django_filters
from .models import ProductSale
from django_filters import DateFilter, CharFilter

class ProductSaleFilter(django_filters.FilterSet):
    start_date = DateFilter(field_name='date', lookup_expr='gte', label='Start Date')
    end_date = DateFilter(field_name='date', lookup_expr='lte', label='End Date')
    product = CharFilter(field_name='product__name', lookup_expr='icontains', label='Product')
    product_type = CharFilter(field_name='product__product_type__value', lookup_expr='icontains', label='Product Type')
    producer = CharFilter(field_name='product__producer__value', lookup_expr='icontains', label='Producer')

    class Meta:
        model = ProductSale
        fields = ['start_date', 'end_date', 'product', 'product_type', 'producer']
