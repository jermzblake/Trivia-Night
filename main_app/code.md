class State(models.Model):
  current_state = models.CharField(max_length=15)
  question = models.ForeignKey('Question', on_delete=models.CASCADE)
  time_stamp = models.DateTimeField()

class Question(models.Model):
  question = models.CharField(max_length=100)
  choices = ArrayField(ArrayField(models.CharField(max_length=100)))
  correct_choice = models.CharField(max_length=100)
  category = models.CharField(max_length=100)
  difficulty = models.CharField(max_length=100)
  time_stamp = models.DateTimeField()

class Result(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  points = models.IntegerField()
  question = models.ForeignKey('Question', on_delete=models.CASCADE)
  time_stamp = models.DateTimeField()