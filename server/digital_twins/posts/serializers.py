from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import *


class PostSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"
