# Generated by Django 5.1.2 on 2024-11-07 22:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="liquidstrength",
            old_name="amount",
            new_name="name",
        ),
        migrations.RenameField(
            model_name="liquidvolume",
            old_name="amount",
            new_name="name",
        ),
        migrations.RenameField(
            model_name="puffsamount",
            old_name="amount",
            new_name="name",
        ),
    ]