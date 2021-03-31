from django.db import models
from django.contrib.auth.models import User


class Bookmark(models.Model):
    name = models.CharField(max_length=100)
    # will store the lat and lon in a dictionary, only allowing one location/arcade for each latlon
    coordinates = models.JSONField()
    # machines will be a jsonfield with a machines key and an array of machine dicts/objects
    machines = models.JSONField(default=list)
    street = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=2)
    website = models.CharField(max_length=100, blank=True)
    description = models.CharField(max_length=1000, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(
        User, related_name="bookmarks", on_delete=models.CASCADE, null=True)
