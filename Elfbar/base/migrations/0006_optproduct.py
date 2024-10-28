# Generated by Django 5.1.2 on 2024-10-27 16:29

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0005_cartridgeresistance_liquidstrength_liquidvolume_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="OptProduct",
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
                ("price", models.PositiveIntegerField(verbose_name="Ціна продажу")),
                ("amount", models.PositiveIntegerField(verbose_name="К-сть")),
                (
                    "product",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="base.product",
                        verbose_name="Продукт",
                    ),
                ),
            ],
        ),
    ]
