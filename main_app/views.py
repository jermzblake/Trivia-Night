from django.shortcuts import render, redirect
from .models import State, Question, Result
from datetime import datetime, timezone, timedelta

# TO DEFINE LENGTH OF TIME FOR QUESTION AND INTERMISSION PERIOD
question_time = 20000
intermission_time = 10000

def switchboard(request):
  state = State.objects.first()
  time_elapsed = (datetime.now(timezone.utc) - state.time_stamp) / timedelta(microseconds=1) / 1000
  if state.current_state == 'question':
    if time_elapsed > question_time:
      state.current_state = 'intermission'
      state.time_stamp = datetime.now(timezone.utc)
      state.save()
      # CALL API AND UPDATE QUESTION IN STATE
      return redirect('intermission')
    if time_elapsed < question_time:
      return redirect('question')
  if state.current_state == 'intermission':
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
  state = State.objects.first()
  time_left = ((state.time_stamp + timedelta(microseconds=(question_time * 1000))) - datetime.now(timezone.utc)) / timedelta(microseconds=1) / 1000
  return render(request, 'question.html', {'time_left': time_left})

def intermission(request):
  state = State.objects.first()
  time_left = ((state.time_stamp + timedelta(microseconds=(intermission_time * 1000))) - datetime.now(timezone.utc)) / timedelta(microseconds=1) / 1000
  return render(request, 'intermission.html', {'time_left': time_left})

def waiting(request):
  return render(request, 'waiting.html')