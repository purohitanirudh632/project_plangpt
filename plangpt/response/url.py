from django.urls import path
from .views import RequestDetail

urlpatterns = [
    path('request/', RequestDetail.as_view(), name='request_view'),
]