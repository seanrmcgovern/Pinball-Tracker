from locations.models import Location
from rest_framework import viewsets, permissions
from .serializers import LocationSerializer

# Location Viewset
# creates CRUD api with default routes


class LocationViewSet(viewsets.ModelViewSet):
    # allow all users to GET the community submitted locations
    # restrict POST, PUT, and DELETE to authenticated users
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]

    queryset = Location.objects.all()

    serializer_class = LocationSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
