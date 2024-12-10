from rest_framework import serializers
from django.contrib.auth.models import User  # Using Django's built-in User model
from .models import CarInfo

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user


class CarInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarInfo
        fields = ['id', 'name', 'photo', 'price', 'user']  # Include user in the output
        read_only_fields = ['user']  # Make user read-only
