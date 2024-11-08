from rest_framework import serializers
from .models import Product, OptProduct, Type, Producer, PodModel, CartridgeResistance, LiquidVolume, LiquidStrength, PuffsAmount


class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = ['id', 'name']


class ProducerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producer
        fields = ['id', 'name', 'producer_type']


class PodModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = PodModel
        fields = ['id', 'name']


class CartridgeResistanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartridgeResistance
        fields = ['id', 'amount']


class LiquidVolumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LiquidVolume
        fields = ['id', 'amount']


class LiquidStrengthSerializer(serializers.ModelSerializer):
    class Meta:
        model = LiquidStrength
        fields = ['id', 'amount']


class PuffsAmountSerializer(serializers.ModelSerializer):
    class Meta:
        model = PuffsAmount
        fields = ['id', 'amount']


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'id', 'product_type', 'producer', 'volume', 'strength', 'puffs_amount', 'resistance', 'pod_model', 
            'name', 'buy_price', 'sell_price', 'drop_sell_price', 'amount', 'sold_amount', 'drop_sold_amount', 
            'barcode'
        ]


class OptProductSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = OptProduct
        fields = ['id', 'product', 'price', 'amount']
