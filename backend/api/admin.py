from django.contrib import admin
from .models import Income, Expense

@admin.register(Income)
class IncomeAdmin(admin.ModelAdmin):
    list_display = ('date','description', 'source', 'amount')
    search_fields = ('date','description', 'source', 'amount')
    list_filter = ('date',)

@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('date','description', 'category', 'amount')
    search_fields = ('date','description', 'category', 'amount')
    list_filter = ('date',)