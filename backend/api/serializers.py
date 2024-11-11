from rest_framework import serializers
from .models import (
    Product,
    OptProduct,
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
        fields = ["id", "name"]


class ProducerSerializer(serializers.ModelSerializer):
    producer_type_name = serializers.CharField(source="producer_type.name")
    class Meta:
        model = Producer
        fields = ["id", "name", "producer_type_name"]


class PodModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = PodModel
        fields = ["id", "name"]


class CartridgeResistanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartridgeResistance
        fields = ["id", "amount"]


class LiquidVolumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LiquidVolume
        fields = ["id", "amount"]


class LiquidStrengthSerializer(serializers.ModelSerializer):
    class Meta:
        model = LiquidStrength
        fields = ["id", "amount"]


class PuffsAmountSerializer(serializers.ModelSerializer):
    class Meta:
        model = PuffsAmount
        fields = ["id", "amount"]


class ProductSerializer(serializers.ModelSerializer):
    product_type_name = serializers.CharField(source="product_type.name")
    producer_name = serializers.CharField(source="producer.name")
    volume_amount = serializers.CharField(source="volume.amount", allow_null=True)
    strength_amount = serializers.CharField(source="strength.amount", allow_null=True)
    puffs_amount_value = serializers.CharField(source="puffs_amount.amount", allow_null=True)
    resistance_amount = serializers.CharField(source="resistance.amount", allow_null=True)
    pod_model_name = serializers.CharField(source="pod_model.name", allow_null=True)

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
            "sold_amount",
            "drop_sold_amount",
            "barcode",
        ]


class OptProductSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = OptProduct
        fields = ["id", "product", "price", "amount"]

class AddSaleSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    amount = serializers.IntegerField()