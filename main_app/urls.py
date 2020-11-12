from django.shortcuts import render
from django.urls import path

from . import views

urlpatterns = [
  path('switchboard', views.switchboard, name='switchboard' ),
  path('question', views.question, name='question'),
  path('intermission', views.intermission, name='intermission'),
  path('waiting', views.waiting, name='waiting'),
]
