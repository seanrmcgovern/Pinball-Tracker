from locations.models import Location
from rest_framework import viewsets, permissions
from .serializers import LocationSerializer

# Location Viewset
# creates CRUD api with default routes


class LocationViewSet(viewsets.ModelViewSet):
    # allow all users to see the community submitted locations
    queryset = Location.objects.all()

    serializer_class = LocationSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
