from django.urls import path, include, re_path
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("posts", PostViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("following_posts/<int:id>/", following_posts, name="following_posts"),
    path("<slug:post>/", post_slug, name="post_slug"),
]
