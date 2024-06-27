from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
)
from django.db.models.signals import post_save
from django.dispatch import receiver


class UserManager(BaseUserManager):
    def create_superuser(
        self, first_name, last_name, username, email, password, **other_fields
    ):
        other_fields.setdefault("is_superuser", True)
        other_fields.setdefault("is_staff", True)
        other_fields.setdefault("is_active", True)
        if other_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must be assigned to is_superuser=True.")
        if other_fields.get("is_staff") is not True:
            raise ValueError("Superuser must be assigned to is_staff=True.")
        if other_fields.get("is_active") is not True:
            raise ValueError("Superuser must be assigned to is_active=True.")
        return self.create_user(
            first_name, last_name, username, email, password, **other_fields
        )

    def create_user(
        self, first_name, last_name, username, email, password, **other_fields
    ):
        if not first_name:
            raise ValueError("First name required.")
        if not last_name:
            raise ValueError("Last name required.")
        if not username:
            raise ValueError("Username required.")
        if not email:
            raise ValueError("Email required.")
        if not password:
            raise ValueError("Password required.")
        email = self.normalize_email(email)
        user = self.model(
            first_name=first_name,
            last_name=last_name,
            username=username,
            email=email,
            **other_fields,
        )
        user.set_password(password)
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["first_name", "last_name", "email"]

    def __str__(self):
        return self.username


def upload_to(instance, filename):
    return "images/{filename}".format(filename=filename)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    follows = models.ManyToManyField(
        "self", related_name="following", symmetrical=False, blank=True
    )
    about = models.TextField(blank=True, null=True)
    profile_pic = models.ImageField(
        blank=True, null=True, upload_to=upload_to, default="images/default_img.png"
    )

    def __str__(self):
        return f"{self.user}"


def create_profile(sender, instance, created, **kwargs):
    if created:
        user_profile = Profile(user=instance)
        print(user_profile)
        user_profile.save()
        admin = Profile.objects.get(user__username="admin")
        if admin:
            user_profile.follows.set([admin, instance.profile.id])
            user_profile.save()
        else:
            user_profile.follows.set([instance.profile.id])
            user_profile.save()


post_save.connect(create_profile, sender=User)
