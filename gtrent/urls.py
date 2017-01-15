from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^/filter$', views.index, name='index'),
    url(r'^/nearby$', views.nearby, name = 'nearby')
]
