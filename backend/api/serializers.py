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


class CreateProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
        
    def create(self, validated_data):
        return Product.objects.create(**validated_data)
    

class SaleSerializer(serializers.Serializer):
    class Meta:
        model=ProductSale
        fields=["product", "sell_price", "amount"]