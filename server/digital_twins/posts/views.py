from .models import *
from .serializers import *
from rest_framework import viewsets
from django.shortcuts import get_object_or_404, get_list_or_404
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


@api_view(["GET", "PUT", "PATCH", "DELETE"])
def post_slug(request, post):
    post = get_object_or_404(Post, slug=post)
    serializer = PostSerializer(post, many=False)
    return Response(serializer.data)


@api_view(["GET"])
def following_posts(request, id):
    posts = get_list_or_404(Post, author__following=id)
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)
