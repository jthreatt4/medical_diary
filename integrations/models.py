from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class Integration(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    service = models.CharField(max_length=255)
    connected = models.DateTimeField(auto_now_add=True)
    access_token = models.TextField()
    refresh_token = models.TextField(null=True, blank=True)
    expires = models.DateTimeField(null=True, blank=True)
