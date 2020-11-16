from django.contrib import admin
from .models import State, Question, Result, Photo, Profile

admin.site.register(State)
admin.site.register(Question)
admin.site.register(Result)
admin.site.register(Photo)
admin.site.register(Profile)