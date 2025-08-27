from django.contrib import admin
from .models import Category, Product, Order, OrderItem
from django.utils.html import format_html


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "created_at", "updated_at")
    search_fields = ("name",)
    prepopulated_fields = {"slug": ("name",)}


class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "price", "stock", "is_active", "thumbnail")
    list_filter = ("category", "is_active", "created_at")
    search_fields = ("name", "category__name")
    prepopulated_fields = {"slug": ("name",)}
    readonly_fields = ("thumbnail",)

    def thumbnail(self, obj):
        if obj.main_image:
            return format_html('<img src="{}" width="50" height="50" style="object-fit:cover;" />', obj.main_image.url)
        return "No Image"
    thumbnail.short_description = "Main Image"


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 1


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "completed", "created_at")
    list_filter = ("completed", "created_at")
    search_fields = ("user__username",)
    inlines = [OrderItemInline]


@admin.register(Product)
class ProductAdminWithRegister(ProductAdmin):
    pass


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ("order", "product", "quantity", "created_at")
    list_filter = ("created_at", "order")
    search_fields = ("product__name", "order__id")
