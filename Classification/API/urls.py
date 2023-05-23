from django.urls import path
from . import views

urlpatterns = [
    path('allbaskets/', views.allBaskets),
    path('type/', views.classificationType),
    path('basket/', views.basketSelection),
    path('item/', views.itemSelection),
    path('savepermutations/', views.savePermutations),
    path('function/',views.classificationAPI),
]