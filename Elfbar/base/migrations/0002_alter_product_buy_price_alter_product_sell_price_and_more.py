# Generated by Django 5.1.2 on 2024-10-26 11:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="product",
            name="buy_price",
            field=models.PositiveIntegerField(default=1),
        ),
        migrations.AlterField(
            model_name="product",
            name="sell_price",
            field=models.PositiveIntegerField(default=1),
        ),
        migrations.AlterField(
            model_name="product",
            name="sold_amount",
            field=models.PositiveIntegerField(default=1),
        ),
    ]