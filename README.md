# React-Django E-Commerce

A full-stack e-commerce application built with Django REST Framework backend and React frontend.

**Author:** Steve Ongera

## 🚀 Features

- **Backend (Django REST Framework)**
  - Product catalog with categories and slugs
  - User authentication with JWT tokens
  - Shopping cart functionality
  - Order management system
  - RESTful API endpoints
  - Admin panel for managing products

- **Frontend (React)**
  - Product browsing and search
  - Product detail pages
  - Shopping cart management
  - User authentication (login/logout)
  - Order placement and history
  - Responsive design

## 📁 Project Structure

```
React-Django-Ecommerce/
├── ecommerce_backend/          # Django backend
│   ├── ecommerce_backend/      # Django project settings
│   ├── shop/                   # Main app
│   │   ├── models.py          # Product, Category, Order models
│   │   ├── views.py           # API viewsets
│   │   ├── serializers.py     # DRF serializers
│   │   ├── urls.py            # API routes
│   │   └── management/        # Custom commands
│   ├── media/                 # User uploaded files
│   └── requirements.txt       # Python dependencies
│
└── ecommerce_frontend/         # React frontend
    ├── src/
    │   ├── components/        # Reusable components
    │   ├── pages/            # Page components
    │   ├── context/          # React contexts
    │   ├── services/         # API client
    │   └── styles.css        # Global styles
    └── package.json          # Node dependencies
```

## 🛠️ Tech Stack

**Backend:**
- Django 4.x
- Django REST Framework
- Django Simple JWT
- Django CORS Headers
- SQLite (development)

**Frontend:**
- React 18
- React Router DOM
- Axios
- JWT Decode
- Context API for state management

## ⚡ Quick Start

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd React-Django-Ecommerce
   ```

2. **Set up Python virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   cd ecommerce_backend
   pip install djangorestframework django-cors-headers djangorestframework-simplejwt
   ```

4. **Configure settings**
   Add to `settings.py`:
   ```python
   INSTALLED_APPS = [
       'django.contrib.admin',
       'django.contrib.auth',
       'django.contrib.contenttypes',
       'django.contrib.sessions',
       'django.contrib.messages',
       'django.contrib.staticfiles',
       'rest_framework',
       'corsheaders',
       'rest_framework_simplejwt',
       'shop',
   ]

   MIDDLEWARE = [
       'corsheaders.middleware.CorsMiddleware',
       'django.middleware.security.SecurityMiddleware',
       'django.contrib.sessions.middleware.SessionMiddleware',
       'django.middleware.common.CommonMiddleware',
       'django.middleware.csrf.CsrfViewMiddleware',
       'django.contrib.auth.middleware.AuthenticationMiddleware',
       'django.contrib.messages.middleware.MessageMiddleware',
       'django.middleware.clickjacking.XFrameOptionsMiddleware',
   ]

   CORS_ALLOW_ALL_ORIGINS = True

   REST_FRAMEWORK = {
       'DEFAULT_AUTHENTICATION_CLASSES': (
           'rest_framework_simplejwt.authentication.JWTAuthentication',
       ),
   }
   ```

5. **Run migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Create superuser**
   ```bash
   python manage.py createsuperuser
   ```

7. **Seed sample data**
   ```bash
   python manage.py seed_shop
   ```

8. **Start Django server**
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../ecommerce_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install axios react-router-dom jwt-decode
   ```

3. **Create environment file**
   Create `.env` file:
   ```
   REACT_APP_API_URL=http://127.0.0.1:8000/api/
   ```

4. **Start React development server**
   ```bash
   npm start
   ```

## 📚 API Endpoints

### Authentication
- `POST /api/token/` - Login (get JWT tokens)
- `POST /api/token/refresh/` - Refresh access token

### Products
- `GET /api/products/` - List all products
- `GET /api/products/{slug}/` - Get product by slug
- `POST /api/products/` - Create product (admin only)

### Categories
- `GET /api/categories/` - List all categories
- `GET /api/categories/{slug}/` - Get category by slug

### Orders
- `GET /api/orders/` - List user's orders
- `POST /api/orders/` - Create new order

### Order Items
- `POST /api/order-items/` - Add items to order

## 🔑 Sample Users

After running `python manage.py seed_shop`:

- **Username:** alice, **Password:** password123
- **Username:** bob, **Password:** password123  
- **Username:** charlie, **Password:** password123

## 🎯 Key Features Implemented

### Backend Models
- **Category**: Product categories with SEO-friendly slugs
- **Product**: Products with category relationships, pricing, and inventory
- **Order**: User orders with completion status
- **OrderItem**: Individual items within orders
- **TimeStampedModel**: Abstract base model for created/updated timestamps

### React Context Management
- **AuthContext**: Handles user authentication and JWT tokens
- **CartContext**: Manages shopping cart state with localStorage persistence

### Security Features
- JWT-based authentication
- CORS configuration for cross-origin requests
- User-specific order filtering
- Protected routes and API endpoints

## 🚧 Development Notes

### Backend Considerations
- Models use slugs for SEO-friendly URLs
- Automatic slug generation with uniqueness checks
- Admin interface configured for easy content management
- Custom management command for seeding sample data

### Frontend Architecture
- Context API for global state management
- Axios interceptors for API authentication
- localStorage for cart persistence
- React Router for client-side routing

## 🔮 Future Enhancements

- [ ] Product image upload and display
- [ ] Advanced search and filtering
- [ ] User registration functionality
- [ ] Payment integration (Stripe/M-Pesa)
- [ ] Order status tracking
- [ ] Product reviews and ratings
- [ ] Inventory management
- [ ] Email notifications
- [ ] Responsive design improvements
- [ ] Unit and integration tests

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure `CORS_ALLOW_ALL_ORIGINS = True` in Django settings
2. **JWT Import Error**: Use `import { jwtDecode } from "jwt-decode"` (not default import)
3. **Missing CSS**: Create `src/styles.css` file or install a CSS framework
4. **Database Migrations**: Run `makemigrations` and `migrate` after model changes

### Development Servers
- **Django**: http://127.0.0.1:8000/
- **React**: http://127.0.0.1:3000/
- **Django Admin**: http://127.0.0.1:8000/admin/

## 📄 License

This project is open source and available under the MIT License.

---

**Created by Steve Ongera** - A modern full-stack e-commerce solution demonstrating Django REST Framework and React integration.