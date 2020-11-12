from django.db import models
from django.contrib.postgres.fields import ArrayField

class State(models.Model):
  current_state = models.CharField(max_length=15)
  question = models.CharField(max_length=100)
  choices = ArrayField(ArrayField(models.CharField(max_length=100)))
  correct_choice = models.CharField(max_length=100)
  time_stamp = models.DateTimeField()
