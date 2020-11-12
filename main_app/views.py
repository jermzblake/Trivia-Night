from django.shortcuts import render, redirect
from .models import State

def switchboard(request):
  state = State.objects.all().first()
  if state.current_state == 'question':
    return redirect('question')
  if state.current_state == 'intermission':
    return redirect('intermission')
  if state.current_state == 'waiting':
    return redirect('waiting')

def question(request):
  return render(request, 'question.html')

def intermission(request):
  return render(request, 'intermission.html')

def waiting(request):
  return render(request, 'waiting.html')


