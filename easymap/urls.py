from django.conf.urls import patterns, url
from easymap import views

# (?P<category_name>[\w\-]+) : They capture the text matched by the regex inside them that can be referenced 
# by the name between the sharp brackets. The name may consist of letters and digits.

urlpatterns = patterns('', 
	url(r'^$', views.index, name='index'),
	url(r'^home', views.index, name='index'),
	url(r'^news', views.show_news, name='news'),
	url(r'^popular', views.show_popular, name="popular"),
	url(r'^querysearch', views.query_search, name="query_search"),
	url(r'^categorys/$',views.show_categorys,name='categorys'),
	url(r'^category', views.category, name='category'),

# 	url(r'^about/$', views.about, name='about'),
	# url(r'^category/(?P<category_name>[\w\-]+)/$', views.category, name='category'),
	# url(r'^yy', views.category, name='category'),
	# url(r'^query/$', views.query, name='query'),
	url(r'^querylist', views.query_list, name='query_list'),
)