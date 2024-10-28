# Generated by Django 5.1.2 on 2024-10-27 16:22

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0004_product_drop_sell_price_product_drop_sold_amount_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="CartridgeResistance",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("amount", models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name="LiquidStrength",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("amount", models.PositiveIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name="LiquidVolume",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("amount", models.PositiveIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name="PodModel",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="PuffsAmount",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("amount", models.PositiveIntegerField()),
            ],
        ),
        migrations.RemoveField(
            model_name="product",
            name="is_drop",
        ),
        migrations.AlterField(
            model_name="product",
            name="name",
            field=models.CharField(max_length=100, verbose_name="Назва | Смак | Колір"),
        ),
        migrations.AlterField(
            model_name="product",
            name="resistance",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                to="base.cartridgeresistance",
                verbose_name="Опір картриджа",
            ),
        ),
        migrations.AlterField(
            model_name="product",
            name="strength",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                to="base.liquidstrength",
                verbose_name="Міцність рідини",
            ),
        ),
        migrations.AlterField(
            model_name="product",
            name="volume",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                to="base.liquidvolume",
                verbose_name="Об'єм рідини",
            ),
        ),
        migrations.AddField(
            model_name="product",
            name="pod_model",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                to="base.podmodel",
                verbose_name="Модель поду",
            ),
        ),
        migrations.AlterField(
            model_name="product",
            name="puffs_amount",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                to="base.puffsamount",
                verbose_name="Кількість тяг",
            ),
        ),
    ]