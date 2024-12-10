from django.db import models
from django.contrib.auth.models import User
from django.conf import settings


class CarInfo(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="cars")
    name = models.CharField(max_length=100)  # Name of the car
    photo = models.ImageField(upload_to='car_photos/', null=True, blank=True)  # Photo of the car
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Price of the car

    def __str__(self):
        return f"{self.name} (${self.price})"
