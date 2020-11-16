from django.shortcuts import render
from django.urls import path

from . import views

urlpatterns = [
  path('switchboard', views.switchboard, name='switchboard' ),
  path('question', views.question, name='question'),
  path('intermission', views.intermission, name='intermission'),
  path('waiting/<str:answer>/<int:score>', views.waiting, name='waiting'),
  path('accounts/signup/', views.signup, name='signup'),
  path('play', views.play, name='play'),
  path('info', views.info, name='info'),
  path('users/<int:profile_id>/add_photo', views.add_photo, name="add_photo"),
]
