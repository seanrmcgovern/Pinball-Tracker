from rest_framework import serializers
from bookmarks.models import Bookmark

# Bookmark Serializer


class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = '__all__'
