from django.db import models

# Create your models here.
class Entry(models.Model):
    content = models.TextField()
    entry_type = models.CharField(max_length=255)
    timestamp = models.DateTimeField()
