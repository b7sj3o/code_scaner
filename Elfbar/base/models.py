from django.db import models


class Product(models.Model):
    product_type = models.ForeignKey("Type", on_delete=models.PROTECT, verbose_name="Тип продукту")
    producer = models.ForeignKey("Producer", on_delete=models.PROTECT, verbose_name="Виробник")
    
    # Для жиж
    volume = models.ForeignKey("LiquidVolume", on_delete=models.PROTECT, verbose_name="Об'єм рідини", null=True, blank=True)
    strength = models.ForeignKey("LiquidStrength", on_delete=models.PROTECT, verbose_name="Міцність рідини", null=True, blank=True)
    
    # Для одноразок
    puffs_amount = models.ForeignKey("PuffsAmount", on_delete=models.PROTECT, verbose_name="Кількість тяг", null=True, blank=True)
    
    # Для картриджів
    resistance = models.ForeignKey("CartridgeResistance", on_delete=models.PROTECT, verbose_name="Опір картриджа", null=True, blank=True)
    
    # Для подів
    pod_model = models.ForeignKey("PodModel", on_delete=models.PROTECT, verbose_name="Модель поду", null=True, blank=True)
    
    # Смак | назва моделі
    name = models.CharField(max_length=100, verbose_name="Назва | Смак | Колір")
    
    buy_price = models.PositiveIntegerField(verbose_name="Ціна закупки")
    sell_price = models.PositiveIntegerField(verbose_name="Ціна продажу")
    drop_sell_price = models.PositiveIntegerField(verbose_name="Ціна продажу - дроп")

    amount = models.PositiveIntegerField(verbose_name="Залишок", null=True, blank=True)
    sold_amount = models.PositiveIntegerField(default=0, verbose_name="К-сть проданих одиниць")
    drop_sold_amount = models.PositiveIntegerField(default=0, verbose_name="К-сть проданих одиниць - дроп")
    
    barcode = models.CharField(max_length=13, unique=True, verbose_name="Штрих-код")
    
    def __str__(self):
        return f"{self.id} - {self.name} ({self.product_type})"

    
class OptProduct(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name="Продукт")
    price = models.PositiveIntegerField(verbose_name="Ціна продажу")
    amount = models.PositiveIntegerField(verbose_name="К-сть")

class Producer(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name
    

class PodModel(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name


class CartridgeResistance(models.Model):
    amount = models.FloatField()
    
    def __str__(self):
        return f"{self.amount}"
    
    
class LiquidVolume(models.Model):
    amount = models.PositiveIntegerField()
    
    def __str__(self):
        return f"{self.amount}"
    

class LiquidStrength(models.Model):
    amount = models.PositiveIntegerField()
    
    def __str__(self):
        return f"{self.amount}"
    

class PuffsAmount(models.Model):
    amount = models.PositiveIntegerField()
    
    def __str__(self):
        return f"{self.amount}"
    

class Type(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    