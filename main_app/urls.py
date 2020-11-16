from django.shortcuts import render
from django.urls import path

from . import views

urlpatterns = [
  path('switchboard', views.switchboard, name='switchboard' ),
  path('question', views.question, name='question'),
  path('intermission', views.intermission, name='intermission'),
  path('record_score/<str:answer>/<int:score>', views.record_score, name='record_score'),
  path('waiting/<int:result_id>', views.waiting, name='waiting'),
  path('accounts/signup/', views.signup, name='signup'),
  path('play', views.play, name='play'),
  path('info', views.info, name='info')
]
