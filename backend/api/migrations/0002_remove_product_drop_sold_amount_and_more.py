# Generated by Django 5.1.2 on 2024-11-22 23:43

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="product",
            name="drop_sold_amount",
        ),
        migrations.RemoveField(
            model_name="product",
            name="sold_amount",
        ),
        migrations.AlterField(
            model_name="product",
            name="amount",
            field=models.PositiveIntegerField(),
        ),
        migrations.AlterField(
            model_name="product",
            name="barcode",
            field=models.CharField(max_length=13, unique=True),
        ),
        migrations.AlterField(
            model_name="product",
            name="buy_price",
            field=models.FloatField(
                validators=[django.core.validators.MinValueValidator(0.0)]
            ),
        ),
        migrations.AlterField(
            model_name="product",
            name="drop_sell_price",
            field=models.PositiveIntegerField(),
        ),
        migrations.AlterField(
            model_name="product",
            name="name",
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name="product",
            name="pod_model",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                to="api.podmodel",
            ),
        ),
        migrations.AlterField(
            model_name="product",
            name="producer",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT, to="api.producer"
            ),
        ),
        migrations.AlterField(
            model_name="product",
            name="product_type",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT, to="api.producttype"
            ),
        ),
        migrations.AlterField(
            model_name="product",
            name="puffs_amount",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                to="api.puffsamount",
            ),
        ),
        migrations.AlterField(
            model_name="product",
            name="resistance",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                to="api.cartridgeresistance",
            ),
        ),
        migrations.AlterField(
            model_name="product",
            name="sell_price",
            field=models.FloatField(
                validators=[django.core.validators.MinValueValidator(0.0)]
            ),
        ),
        migrations.AlterField(
            model_name="product",
            name="strength",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                to="api.liquidstrength",
            ),
        ),
        migrations.AlterField(
            model_name="product",
            name="volume",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                to="api.liquidvolume",
            ),
        ),
        migrations.AlterField(
            model_name="productsale",
            name="amount",
            field=models.PositiveIntegerField(),
        ),
        migrations.AlterField(
            model_name="productsale",
            name="product",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="api.product"
            ),
        ),
        migrations.AlterField(
            model_name="productsale",
            name="sell_price",
            field=models.PositiveIntegerField(),
        ),
    ]