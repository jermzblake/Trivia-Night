from django.shortcuts import render, redirect
from .models import State, Question, Result
from datetime import datetime, timezone, timedelta

# TO DEFINE LENGTH OF TIME FOR QUESTION AND INTERMISSION PERIOD
question_time = 30000
intermission_time = 10000

def switchboard(request):
  state = State.objects.first()
  if state.current_state == 'question':
    time_elapsed = (datetime.now(timezone.utc) - state.time_stamp) / timedelta(microseconds=1) / 1000
    if time_elapsed > question_time:
      state.current_state = 'intermission'
      state.time_stamp = datetime.now(timezone.utc)
      state.save()
      return redirect('intermission')
    if time_elapsed < question_time:
      return redirect('question')
  if state.current_state == 'intermission':
    time_elapsed = (datetime.now(timezone.utc) - state.time_stamp)  / timedelta(microseconds=1) / 1000
    if time_elapsed > intermission_time:
      state.current_state = 'question'
      state.time_stamp = datetime.now(timezone.utc)
      state.save()
      return redirect('question')
    if time_elapsed < question_time:
      return redirect('intermission')
  if state.current_state == 'waiting':
    return redirect('waiting')

def question(request):
  return render(request, 'question.html')

def intermission(request):
  return render(request, 'intermission.html')

def waiting(request):
  return render(request, 'waiting.html')