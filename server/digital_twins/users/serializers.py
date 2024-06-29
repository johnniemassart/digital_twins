from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import *


class UserProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = ["about", "profile_pic", "follows"]


class UserSerializer(ModelSerializer):
    profile = UserProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "username",
            "email",
            "is_active",
            "password",
            "profile",
        ]
        read_only_fields = ["is_active"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        instance.is_active = True
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class ProfileSerializer(ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = Profile
        fields = ["id", "user", "about", "profile_pic", "follows"]
