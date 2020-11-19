from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import User
from django.urls import reverse

class State(models.Model):
  current_state = models.CharField(max_length=15)
  question = models.ForeignKey('Question', on_delete=models.CASCADE)
  time_stamp = models.DateTimeField()

  def __str__(self):
    return f"{self.current_state} at {self.time_stamp}"

class Question(models.Model):
  question = models.CharField(max_length=250)
  choices = ArrayField(ArrayField(models.CharField(max_length=100)))
  remove_order = ArrayField(ArrayField(models.CharField(max_length=100)))
  correct_choice = models.CharField(max_length=100)
  category = models.CharField(max_length=100)
  difficulty = models.CharField(max_length=100)
  time_stamp = models.DateTimeField()

  def __str__(self):
    return self.question

class Result(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  points = models.IntegerField()
  question = models.ForeignKey('Question', on_delete=models.CASCADE)
  answer = models.CharField(max_length=100)
  time_stamp = models.DateTimeField()

class Profile(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  quip = models.CharField(max_length=100, default='play to win')
  url = models.CharField(max_length=200, default='https://www.minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg')

  def __str__(self):
    return f'{self.user.username} Profile'

  def get_absolute_url(self):
    return reverse('detail', kwargs={'user_id': self.user.id})

