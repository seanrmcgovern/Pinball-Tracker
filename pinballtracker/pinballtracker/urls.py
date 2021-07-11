from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('frontend.urls')),
    path('', include('leads.urls')),
    path('', include('accounts.urls')),
    path('', include('locations.urls')),
    path('', include('bookmarks.urls'))
]
