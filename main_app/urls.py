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
  path('info', views.info, name='info'),
  path('detail/<int:user_id>', views.profile_detail, name='detail'),
  path('profile/create', views.ProfileCreate.as_view(), name='profiles_create'),
  path('profile/<int:pk>/update/', views.ProfileUpdate.as_view(), name='profiles_update'),
  path('profile/<int:pk>/delete/', views.ProfileDelete.as_view(), name='profiles_delete'),
  path('detail/<int:user_id>/add_photo', views.add_photo, name='add_photo'),
]
