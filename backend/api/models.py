from django.db import models
from django.core.validators import MinValueValidator

class Produc
    product_type = models.ForeignKey("ProductType", on_delete=models.PROTECT)
    producer = models.ForeignKey("Producer", on_delete=models.PROTECT)
    
    # Для жиж
    volume = models.ForeignKey("LiquidVolume", on_delete=models.PROTECT, null=True, blank=True)
    strength = models.ForeignKey("LiquidStrength", on_delete=models.PROTECT, null=True, blank=True)
    
    # Для одноразок
    puffs_amount = models.ForeignKey("PuffsAmount", on_delete=models.PROTECT, null=True, blank=True)
    
    # Для картриджів
    resistance = models.ForeignKey("CartridgeResistance", on_delete=models.PROTECT, null=True, blank=True)
    
    # Для подів
    pod_model = models.ForeignKey("PodModel", on_delete=models.PROTECT, null=True, blank=True)
    
    # Смак | назва моделі
    name = models.CharField(max_length=100)
    
    buy_price = models.FloatField(
        validators=[MinValueValidator(0.0)])
    sell_price = models.FloatField(
        validators=[MinValueValidator(0.0)])
    drop_sell_price = models.PositiveIntegerField()

    amount = models.PositiveIntegerField()
    
    barcode = models.CharField(max_length=13, unique=True)
    
    def update_buy_price(self, new_buy_price, new_amount):
        old_total_value = self.buy_price * self.amount
        new_total_value = new_buy_price * new_amount
        total_amount = self.amount + new_amount
        
        self.buy_price = round((old_total_value+new_total_value) / total_amount, 2)
        self.save()
        
    
    def __str__(self):
        return f"{self.id} - {self.name} ({self.product_type})"

    
# TODO: idk what to do, i dont want to keep each sale
# maybe would change it to DailyProductSale, so 1 table row = 1 real day, O(n) :)))
class ProductSale(models.Model):
    # If we would delete product, all sales related to that product will be deleted too
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    sell_price = models.PositiveIntegerField()
    amount = models.PositiveIntegerField()
    date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self) -> str:
        return f"{self.product.name}, {self.product.product_type.value} - {self.sell_price}грн, {self.amount}шт."
    
class ProductType(models.Model):
    value = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.value
    
    
    
class Producer(models.Model):
    value = models.CharField(max_length=100)
    producer_type = models.ForeignKey("ProductType", on_delete=models.PROTECT)
    
    def __str__(self):
        return f"{self.value} - {self.producer_type}"
    

class PodModel(models.Model):
    value = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.value
+
cq  SwC VBNM,Alass CartridgeResistance(models.Model):
    value = models.FloatField(unique=True)
    
    def __str__(self):
        return f"{self.value}"
    
    
class LiquidVolume(models.Model):
    value = models.PositiveIntegerField(unique=True)
    
    def __str__(self):
        return f"{self.value}"
    

class LiquidStrength(models.Model):
    value = models.PositiveIntegerField(unique=True)
    
    def __str__(self):
        return f"{self.value}"
    

class PuffsAmount(models.Model):
    value = models.PositiveIntegerField(unique=True)
    
    def __str__(self):
        return f"{self.value}"
    
