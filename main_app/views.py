from django.shortcuts import render, redirect
from .models import State, Question, Result
from datetime import datetime, timezone, timedelta

# Django signup
from django.contrib.auth import login
from django.contrib.auth.forms import UserCreationForm

# TO DEFINE LENGTH OF TIME FOR QUESTION AND INTERMISSION PERIOD
question_time = 10000
intermission_time = 5000

# imports for the api
import requests
import json
from html.parser import HTMLParser
from html import unescape
import html
import random

# When we trigger a refresh for a user, they are sent to this view. This view redirects them based on current game state.
def switchboard(request):

  # Set state variable representing current state of game
  state = State.objects.first()
  # Set time_elapsed variable representing time elapsed since last change of state
  time_elapsed = (datetime.now(timezone.utc) - state.time_stamp) / timedelta(microseconds=1) / 1000

  if state.current_state == 'question':
    # If time_elapsed exceeds question_time, it's time to switch to intermission state
    if time_elapsed > question_time:
      # Change state to intermission and set time_stamp
      state.current_state = 'intermission'
      state.time_stamp = datetime.now(timezone.utc)
      state.save()
      # Call get_question function to populate State with new question
      get_question()
      # Redirect user to intermission flow
      return redirect('intermission')
    # If time_elapsed is less than question_time, we're in the question state
    if time_elapsed < question_time:
      # Redirect user to question flow
      return redirect('question')

  if state.current_state == 'intermission':
    # If time_elapsed exceeds intermission_time, it's time to switch to question state
    if time_elapsed > intermission_time:
      # Change state to question and set new time_stamp
      state.current_state = 'question'
      state.time_stamp = datetime.now(timezone.utc)
      state.save()
      # Redirect user to question flow
      return redirect('question')
    # If time_elapsed is less than question_time, we're in the intermission state
    if time_elapsed < intermission_time:
      # Redirect user to intermission flow
      return redirect('intermission')

# User will be sent to this view from the switchboard if the game state is question
def question(request):
  # Set variables representing current state, time_left until next state change and question object
  state = State.objects.first()
  time_left = ((state.time_stamp + timedelta(microseconds=(question_time * 1000))) - datetime.now(timezone.utc)) / timedelta(microseconds=1) / 1000
  question = state.question
  # Render question.html
  return render(request, 'game/question.html', {'time_left': time_left, 'question': question})

def intermission(request):
  state = State.objects.first()
  category = state.question.category
  time_left = ((state.time_stamp + timedelta(microseconds=(intermission_time * 1000))) - datetime.now(timezone.utc)) / timedelta(microseconds=1) / 1000
  return render(request, 'game/intermission.html', {'time_left': time_left, 'category': category})

# When a user selects an answer, they are directed to this flow which determines whether it was correct, adds the result to the db and renders a waiting room until the intermission state
def waiting(request, answer, score):
  # Set variable representing current state
  state = State.objects.first()
  # If the chosen answer is incorrect, make points earned 0
  if answer.strip() != state.question.correct_choice:
    score = 0
  # Create new instance of Result model
  new_result = Result(
    user = request.user,
    points = score,
    question = state.question,
    time_stamp = datetime.now(timezone.utc)
  )
  new_result.save()
  # Set variable time_left equal to the remaining time in the question state
  time_left = ((state.time_stamp + timedelta(microseconds=(question_time * 1000))) - datetime.now(timezone.utc)) / timedelta(microseconds=1) / 1000
  # Render waiting.html
  return render(request, 'game/waiting.html', {'score':score, 'time_left':time_left})

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

    # Create new instance of Question model
    new_question = Question(
      question=question_string,
      choices=wrong_answer_pool,
      time_stamp=datetime.now(timezone.utc),
      correct_choice=answer_string,
      category=category_string,
      difficulty=difficulty_string
    )
    new_question.save()

    # Save new instance of Question as the question in State
    state = State.objects.first()
    state.question = new_question
    state.save()

def signup(request):
  error_message = ''
  if request.method == 'POST':
    # This is what creates a user object that has the data from the browser
    form = UserCreationForm(request.POST)
    if form.is_valid():
      # The saves the user to the database if the form is valid
      user = form.save()
      login(request, user)
      return redirect('login')
    else:
      error_message = 'Invalid sign up - try again'
  # Error Handling. We should make a cool 404 page.
  form = UserCreationForm()
  context = {'form': form, 'error_message': error_message}
  return render(request, 'registration/signup.html', context)