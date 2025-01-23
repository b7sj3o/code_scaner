from rest_framework import serializers
from .models import (
    Product,
    ProductSale,
    ProductType,
    Producer,
    PodModel,
    CartridgeResistance,
    LiquidVolume,
    LiquidStrength,
    PuffsAmount,
)


class ProductTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductType
        fields = ["id", "value"]


class ProducerSerializer(serializers.ModelSerializer):
    producer_type_name = serializers.CharField(source="producer_type.value")
    class Meta:
        model = Producer
        fields = ["id", "value", "producer_type_name"]


class PodModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = PodModel
        fields = ["id", "value"]


class CartridgeResistanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartridgeResistance
        fields = ["id", "value"]


class LiquidVolumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LiquidVolume
        fields = ["id", "value"]


class LiquidStrengthSerializer(serializers.ModelSerializer):
    class Meta:
        model = LiquidStrength
        fields = ["id", "value"]


class PuffsAmountSerializer(serializers.ModelSerializer):
    class Meta:
        model = PuffsAmount
        fields = ["id", "value"]


class GetProductSerializer(serializers.ModelSerializer):
    product_type_name = serializers.CharField(source="product_type.value")
    producer_name = serializers.CharField(source="producer.value")
    volume_amount = serializers.CharField(source="volume.value", allow_null=True, required=False, allow_blank=True)
    strength_amount = serializers.CharField(source="strength.value", allow_null=True, required=False, allow_blank=True)
    puffs_amount_value = serializers.CharField(source="puffs_amount.value", allow_null=True, required=False, allow_blank=True)
    resistance_amount = serializers.CharField(source="resistance.value", allow_null=True, required=False, allow_blank=True)
    pod_model_name = serializers.CharField(source="pod_model.value", allow_null=True, required=False, allow_blank=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "product_type_name",
            "producer_name",
            "volume_amount",
            "strength_amount",
            "puffs_amount_value",
            "resistance_amount",
            "pod_model_name",
            "name",
            "buy_price",
            "sell_price",
            "drop_sell_price",
            "amount",
            "barcode",
        ]


from rest_framework import serializers
from .models import Product, ProductType, Producer, LiquidVolume, LiquidStrength, PuffsAmount, CartridgeResistance, PodModel

class CreateProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            "product_type", "producer", "volume", "strength", "puffs_amount", 
            "resistance", "pod_model", "name", "buy_price", "sell_price", 
            "drop_sell_price", "amount", "barcode"
        ]

    def create(self, validated_data):
        return Product.objects.create(**validated_data)
    
    def to_internal_value(self, data):
        product_type_value = data.get('product_type')
        producer_value = data.get('producer')
        volume_value = data.get('volume')
        strength_value = data.get('strength')
        puffs_amount_value = data.get('puffs_amount')
        resistance_value = data.get('resistance')
        pod_model_value = data.get('pod_model')

        data['product_type'] = ProductType.objects.get(value=product_type_value).id
        data['producer'] = Producer.objects.get(value=producer_value, producer_type=data['product_type']).id

        if volume_value:
            data['volume'] = LiquidVolume.objects.get(value=volume_value).id
        if strength_value:
            data['strength'] = LiquidStrength.objects.get(value=strength_value).id
        if puffs_amount_value:
            data['puffs_amount'] = PuffsAmount.objects.get(value=puffs_amount_value).id
        if resistance_value:
            data['resistance'] = CartridgeResistance.objects.get(value=resistance_value).id
        if pod_model_value:
            data['pod_model'] = PodModel.objects.get(value=pod_model_value).id


        return super().to_internal_value(data)

    
class ProductSaleSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_type = serializers.CharField(source='product.product_type.value', read_only=True)
    producer_name = serializers.CharField(source='product.producer.value', read_only=True)

    class Meta:
        model = ProductSale
        fields = ['id', 'product_name', 'product_type', 'producer_name', 'sell_price', 'amount', 'date']