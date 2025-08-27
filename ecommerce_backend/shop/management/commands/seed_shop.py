from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from shop.models import Category, Product, Order, OrderItem
from decimal import Decimal
import random


class Command(BaseCommand):
    help = "Seed database with sample users, products, and orders"

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.NOTICE("Seeding shop data..."))

        # --- Create Users ---
        users_data = [
            {"username": "alice", "first_name": "Alice", "last_name": "Johnson", "email": "alice@example.com"},
            {"username": "bob", "first_name": "Bob", "last_name": "Smith", "email": "bob@example.com"},
            {"username": "charlie", "first_name": "Charlie", "last_name": "Brown", "email": "charlie@example.com"},
        ]

        users = []
        for data in users_data:
            user, created = User.objects.get_or_create(username=data["username"], defaults={
                "first_name": data["first_name"],
                "last_name": data["last_name"],
                "email": data["email"],
            })
            if created:
                user.set_password("password123")
                user.save()
                self.stdout.write(self.style.SUCCESS(f"Created user {user.username}"))
            users.append(user)

        # --- Create Category ---
        category, _ = Category.objects.get_or_create(name="Electronics")
        self.stdout.write(self.style.SUCCESS(f"Category '{category.name}' ready."))

        # --- Create Products ---
        product_names = [
            "iPhone 15 Pro", "Samsung Galaxy S23", "MacBook Air M2",
            "Dell XPS 13", "iPad Pro", "Sony WH-1000XM5",
            "Apple Watch Ultra", "PlayStation 5", "Xbox Series X",
            "Canon EOS R7"
        ]

        products = []
        for name in product_names:
            product, created = Product.objects.get_or_create(
                name=name,
                defaults={
                    "category": category,
                    "description": f"{name} high quality product.",
                    "price": Decimal(random.randint(300, 2000)),
                    "stock": random.randint(5, 50),
                    "is_active": True,
                }
            )
            products.append(product)
            if created:
                self.stdout.write(self.style.SUCCESS(f"Created product {product.name}"))

        # --- Create Orders ---
        for i in range(2):
            user = random.choice(users)
            order = Order.objects.create(user=user, completed=bool(random.getrandbits(1)))
            self.stdout.write(self.style.SUCCESS(f"Created order {order.id} for {user.username}"))

            # Add random items
            for _ in range(2):  # 2 items per order
                product = random.choice(products)
                quantity = random.randint(1, 3)
                OrderItem.objects.create(order=order, product=product, quantity=quantity)
                self.stdout.write(self.style.NOTICE(f"   Added {quantity} x {product.name}"))

        self.stdout.write(self.style.SUCCESS("✅ Seeding complete!"))
