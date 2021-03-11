from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Location(models.Model):
    name = models.CharField(max_length=100)
    # will store the lat and lon in a dictionary, only allowing one location/arcade for each latlon
    coordinates = models.JSONField(unique=True)
    # machines will be a jsonfield with a machines key and an array of machine dicts/objects
    street = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=2)
    website = models.CharField(max_length=100, blank=True)
    description = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(
        User, related_name="locations", on_delete=models.CASCADE, null=True)
