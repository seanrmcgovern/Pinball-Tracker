from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('explore', views.index),
    path('locations', views.index),
    path('profile', views.index),
    path('register', views.index),
    path('login', views.index)
]
