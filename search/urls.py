import imp
from . import views
from django.urls import path 

urlpatterns = [
    path('', views.index),
    path('privacy/', views.PrivacyView.as_view()),
]
