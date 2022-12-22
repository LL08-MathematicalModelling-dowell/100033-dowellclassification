from django.urls import path
from . import views

urlpatterns = [
    path('type/', views.classificationType),
    path('basket/', views.basketSelection),
    path('item/', views.itemSelection),
    path('api/', views.classificationAPI),
]