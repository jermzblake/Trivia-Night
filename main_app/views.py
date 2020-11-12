from django.shortcuts import render, redirect
from .models import State, Question, Result

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

def get_question(request):
  
    # The call to the api and the response being converted into json
    response = requests.get('https://opentdb.com/api.php?amount=1')
    data = response.json()

    # Raw data that is retrieved from api     
    incorrect_answers = data['results'][0]['incorrect_answers']
    correct_answer = data['results'][0]['correct_answer']
    category = data['results'][0]['category']
    question = data['results'][0]['question']
    difficulty =data['results'][0]['diffuculty']

    #Data that is 'unescaped' to deal with unicode issues.
    question_string = html.unescape(question)
    answer_string = html.unescape(correct_answer)
    wrong_answer_pool = html.unescape(incorrect_answers)
    difficulty_string = html.unescape(difficulty)

    # This creates a answer pool in a random order using random method
    wrong_answer_pool += [answer_string]  
    wrong_answer_pool = random.sample(wrong_answer_pool,len(wrong_answer_pool))
    # wrong_answer_pool is now a radomized list with the answer as well