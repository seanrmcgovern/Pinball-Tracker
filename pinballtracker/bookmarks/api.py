from locations.models import Location
from rest_framework import viewsets, permissions
from .serializers import BookmarkSerializer

# Bookmark Viewset
# creates CRUD api with default routes


class BookmarkViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        return self.request.user.bookmarks.all()

    serializer_class = BookmarkSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
