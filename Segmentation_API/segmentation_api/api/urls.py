from django.urls import path
from . import views

urlpatterns = [
    path('', views.home),
    path('input/', views.segmentation_input),
    path('api/', views.segmentation_api),

]