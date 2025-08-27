from rest_framework import serializers
from .models import Category, Product, Order, OrderItem


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "slug"]


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source="category", write_only=True
    )

    main_image = serializers.ImageField(use_url=True)

    class Meta:
        model = Product
        fields = [
            "id", "name", "slug", "description", "price", "stock", 
            "is_active", "created_at", "updated_at", "category", "category_id" ,  "main_image", "sub_image1", "sub_image2"
        ]


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = ["id", "product", "quantity"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ["id", "user", "completed", "created_at", "items"]
