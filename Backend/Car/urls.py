from rest_framework.routers import DefaultRouter
from .views import UserViewSet, CarInfoViewSet, RegisterView
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'info', CarInfoViewSet, basename='car')

urlpatterns = [
    # User registration
    path('register/', RegisterView.as_view(), name='register'),
    # Token management
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
] + router.urls
