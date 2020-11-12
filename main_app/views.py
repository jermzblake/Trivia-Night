from django.shortcuts import render, redirect
from .models import State, Question, Result
from datetime import datetime, timezone, timedelta

# TO DEFINE LENGTH OF TIME FOR QUESTION AND INTERMISSION PERIOD
question_time = 20000
intermission_time = 10000

# imports for the api
# import requests
import json
from html.parser import HTMLParser
from html import unescape
import html
import random

def switchboard(request):
  state = State.objects.first()
  time_elapsed = (datetime.now(timezone.utc) - state.time_stamp) / timedelta(microseconds=1) / 1000
  if state.current_state == 'question':
    if time_elapsed > question_time:
      state.current_state = 'intermission'
      state.time_stamp = datetime.now(timezone.utc)
      state.save()
      get_question()
      return redirect('intermission')
    if time_elapsed < question_time:
      return redirect('question')
  if state.current_state == 'intermission':
    if time_elapsed > intermission_time:
      state.current_state = 'question'
      state.time_stamp = datetime.now(timezone.utc)
      state.save()
      return redirect('question')
    if time_elapsed < intermission_time:
      return redirect('intermission')
  if state.current_state == 'waiting':
    return redirect('waiting')

def question(request):
  state = State.objects.first()
  time_left = ((state.time_stamp + timedelta(microseconds=(question_time * 1000))) - datetime.now(timezone.utc)) / timedelta(microseconds=1) / 1000
  question = state.question.question
  
  print(question)
  return render(request, 'question.html', {'time_left': time_left})

def intermission(request):
  state = State.objects.first()
  time_left = ((state.time_stamp + timedelta(microseconds=(intermission_time * 1000))) - datetime.now(timezone.utc)) / timedelta(microseconds=1) / 1000
  return render(request, 'intermission.html', {'time_left': time_left})

def waiting(request):
  get_question()
  return render(request, 'waiting.html')

def get_question():
  
    # The call to the api and the response being converted into json
    response = requests.get('https://opentdb.com/api.php?amount=1')
    data = response.json()

    # Raw data that is retrieved from api     
    incorrect_answers = data['results'][0]['incorrect_answers']
    correct_answer = data['results'][0]['correct_answer']
    category = data['results'][0]['category']
    question = data['results'][0]['question']
    difficulty = data['results'][0]['difficulty']

    #Data that is 'unescaped' to deal with unicode issues.
    question_string = html.unescape(question)
    answer_string = html.unescape(correct_answer)
    wrong_answer_pool = html.unescape(incorrect_answers)
    category_string = html.unescape(category)
    difficulty_string = html.unescape(difficulty)

    # This creates a answer pool in a random order using random method
    wrong_answer_pool += [answer_string]  
    wrong_answer_pool = random.sample(wrong_answer_pool,len(wrong_answer_pool))
    # wrong_answer_pool is now a radomized list with the answer as well

    new_question = Question(
      question=question_string,
      choices=wrong_answer_pool,
      time_stamp=datetime.now(timezone.utc),
      correct_choice=answer_string,
      category=category_string,
      difficulty=difficulty_string
    )
    new_question.save()

    state = State.objects.first()
    state.question = new_question
    state.save()