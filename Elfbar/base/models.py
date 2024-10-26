from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=100)
    sell_price = models.PositiveIntegerField()
    buy_price = models.PositiveIntegerField()
    
    amount = models.PositiveIntegerField()
    sold_amount = models.PositiveIntegerField(default=0)
    
    barcode = models.CharField(max_length=13, unique=True)
    
    producer = models.ForeignKey("Producer", on_delete=models.PROTECT)
    product_type = models.ForeignKey("Type", on_delete=models.PROTECT)
    location = models.ForeignKey("Location", on_delete=models.PROTECT)
    
    def __str__(self):
        return f"{self.name} ({self.product_type})"
    
    
class Producer(models.Model):
    name = models.CharField(max_length=100)
    producer_type = models.ForeignKey("Type", on_delete=models.PROTECT, null=True, blank=True, default=1)
    
    def __str__(self):
        return self.name
    

class Type(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    

class Location(models.Model):
    location = models.CharField(max_length=100)
    
    def __str__(self):
        return self.location
