from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=100)
    type = models.ForeignKey("Type", on_delete=models.DO_NOTHING)
    price = models.PositiveIntegerField()
    amount = models.PositiveIntegerField()
    barcode = models.CharField(max_length=20)
    
    def __str__(self):
        return f"{self.name} ({self.type})"
    
    
class Type(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name