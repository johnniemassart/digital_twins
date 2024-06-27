from django.contrib import admin
from django.contrib.auth.models import Group
from .models import *
from django.contrib.auth.admin import UserAdmin

admin.site.unregister(Group)


class UserProfileInline(admin.StackedInline):
    model = Profile


class UserAdminConfig(UserAdmin):
    search_fields = ("username", "first_name", "last_name", "email")
    list_filter = ("is_staff", "is_superuser", "is_active")
    ordering = ("username",)
    list_display = ("username", "first_name", "last_name", "email")
    fieldsets = (
        (None, {"fields": ("username",)}),
        ("Personal Information", {"fields": ("first_name", "last_name", "email")}),
        (
            "Permissions",
            {
                "fields": (
                    "is_staff",
                    "is_superuser",
                    "is_active",
                )
            },
        ),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "first_name",
                    "last_name",
                    "username",
                    "email",
                    "password1",
                    "password2",
                    "is_staff",
                    "is_active",
                ),
            },
        ),
    )
    inlines = [UserProfileInline]


admin.site.register(User, UserAdminConfig)
