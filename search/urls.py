import imp
from . import views
from django.urls import path

urlpatterns = [
    path("", views.index, name="search"),
    path("privacy/", views.PrivacyView.as_view(), name="privacy"),
]
