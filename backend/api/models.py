from django.db import models

class Income(models.Model):
    date = models.DateField()
    description = models.CharField(max_length=100, default="No description")
    source = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)

class Expense(models.Model):
    date = models.DateField()
    description = models.CharField(max_length=100, default="No description")
    category = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)