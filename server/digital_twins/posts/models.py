from django.db import models
from users.models import User, Profile
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from django.utils.text import slugify


class Post(models.Model):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="posts")
    title = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255, unique=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title


@receiver(pre_save, sender=Post)
def add_slug(sender, instance, *args, **kwargs):
    instance.slug = slugify(instance.title)
