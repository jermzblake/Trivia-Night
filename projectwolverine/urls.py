from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('main_app.urls')),
    # django's built-in auth urls for the built-in views
    path('accounts/', include('django.contrib.auth.urls'))
]
