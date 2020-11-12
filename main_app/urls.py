from django.shortcuts import render
from django.urls import path

from . import views

urlpatterns = [
  path('switchboard', views.switchboard, name='switchboard' ),
  path('game/question', views.question, name='question'),
  path('game/intermission', views.intermission, name='intermission'),
  path('game/waiting', views.waiting, name='waiting'),
]
