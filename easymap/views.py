from django.http import HttpResponse, HttpResponseRedirect
from django.utils.datastructures import MultiValueDictKeyError
from django.shortcuts import render
from easymap.models import Category, Query, AllLocations
import json
import urllib2
import time
import random
import re

# get 5 objects that randomly distribute in the set
def get_five_radom_digits(locations_list_length, locations_list):

	# # Give the total number of the objects.
	# last = al.objects.count() - 1 in Model.objects.all() level
	last = locations_list_length - 1
	# # get the around middle number. int / int = int, that's in Python.
	# middle = al.objects.count()/2 in Model.objects.all() level
	middle = locations_list_length/2
	# # get first 2 numbers in the first half part of the total number
	index_1 = random.randint(0, middle-1)
	index_2 = random.randint(0, middle-1)
	# # This keeps the first 2 ints definitely not the same, provided the total number is larger.
	if index_1 == index_2 : 
		index_2 = middle-1

	index_3 = middle
	# # get the last 2 numbers in the second half of the total numbers,
	# # and keep the two nor the same
	index_4 = random.randint(middle+1, last)
	index_5 = random.randint(middle+1, last)
	if index_4 == index_5:
		index_5 = last

	index_list = [index_1, index_2, index_3, index_4, index_5]
	return index_list

# Auxiliary function for creating a new query.
def save_query(query_type, keywords, content):

	current_time = time.strftime("%H:%M:%S")
	current_date = time.strftime("%Y-%m-%d")
	# When creating category date, can use 'datetime.date.today()'

	try:
			q = Query.objects.get(content=content)

		# If it already exists in datebase, then update it. 
			q.creating_time = current_time
			q.creating_date = current_date
			frequency = q.frequency +1
			q.frequency = frequency
			q.save()

		# When doesn't exists then create it.
	except Query.DoesNotExist:
			q = Query.objects.create(query_type = query_type, keywords = keywords, content = content
				, creating_time = current_time, creating_date = current_date)

	return q

# This function is for user searching.
def query_search(request):
	
	print request.POST['search-content']
	content = request.POST['search-content']

	# Below is a RegEx for filtering harmful inputs.
	# In this stage, give error when input has special chars except '-', 
	# but okay with 0-9, a-z, A-Z
	pattern = "^[a-zA-Z0-9-]+$"

	result = re.match(pattern, content)

	if result is None:
# !! NEED ERROR Page
		return HttpResponse("ERROR")

	# Except the content with special chars, the rest is mainly just only one word.
	query_type = 'single-keyword'
	keywords = content

	query = save_query(query_type, keywords, content)

	# get the category and the locations the user needs
	locations_needed = AllLocations.objects.filter(name__icontains=query.keywords)

	print locations_needed

	context_dict = {}

	context_dict['locations'] = locations_needed
	context_dict['table_name'] = str(keywords)+"-related"
	context_dict['is_virtual_table'] = True
	context_dict['columns_name'] = get_columns_name(keywords)

	return render(request,'easymap/category.html', context_dict)
	# destination = request.GET['query_name']


# 	finally:
# 			request_string = destination

# 			# c = Category.objects.all()
# 			the_right_cat = ""
			
# 			# Here used a Field Type approach to filter and get the only one category.
# 			the_right_cat = Category.objects.get(related_names__icontains=request_string)
			
# 			# Below are the backup method, but doesn't work for nhs. case-sensitive.
# 			# for single_c in c:
# 			# 	print single_c.related_names
# 			# 	if retquest_string in single_c.related_names:
# 			# 		print retquest_string
# 			# 		the_right_cat = single_c
# 			# 		break

# 			if the_right_cat == "":
# 				return HttpResponse("ERROR")


# 			# then, get 5 random numbers to help select 5 typical locations for
# 			# users, instead of all locations due to the USAGE_LIMIT in Google Map services
# 			locations_list_length = len(locations_needed)
			
# 			# Here used list() to generate a list for objects set.
# 			# Generate a list is necessary because we can directly access these elements within it
# 			# by using the indexes when QuerySet is the only thing we get, rather than Model.objects.all()
# 			locations_list = list(locations_needed)
# 			indexes = get_five_radom_digits(locations_list_length, locations_list)

# # It's not a JSON, but Whay is it? Why using it not json?
# 			# selected_locations_list is generated from locations_list which is fully having all locations
# 			# inside a category
# 			selected_locations_list = []
# 			for index in indexes:
# 				selected_locations_list.append(vars(locations_list[index]))

# 			#NOTE: each single_location in selected_locations_list is a dict type data.
# 			# Following is a filter process by which the final selected_locations_list could
# 			# be set without odd entries from database
# 			for single_location in selected_locations_list:
# 				# print "Before: %s " %single_location
# 				del single_location['_state']
# 				del single_location['category_id']
# 				del single_location['id']
# 				# print "After: %s" %single_location
				
# 			return HttpResponse(selected_locations_list)
			# return HttpResponse("OK")

def query_list(request):
	print request.GET

	# numbers = request.GET['query_numbers']
	# request_string = request.GET['name']

	# if numbers == "":
	# 	return HttpResponse("ERROR")

	# # c = Category.objects.all()
	# the_right_cat = ""
	# # Here used a Field Type approach to filter and get the only one category.
	# the_right_cat = Category.objects.get(related_names__icontains=request_string)

	# if the_right_cat == "":
	# 	return HttpResponse("ERROR")


	# # get the category and the locations the user needs
	# locations_needed = AllLocations.objects.filter(category = the_right_cat)
	# locations_list = list(locations_needed)

	# selected_locations_list = []

	# indexes = numbers.split(",")

	# # int() is for parsing string to integer;
	# # (index - 1) is due to the defference passing from the table in HTML in which begins with 1 not 0.
	# for index in indexes:
	# 	selected_locations_list.append(vars(locations_list[int(index)-1]))

	# for single_location in selected_locations_list:
	# # print "Before: %s " %single_location
	# 	del single_location['_state']
	# 	del single_location['category_id']
	# 	del single_location['id']

	# context_dict = {}
	# categories = Category.objects.all()
	# context_dict['categories'] = categories	
	# context_dict['boldmessage'] = "here is the bold message!"
	# context_dict['locations'] = selected_locations_list
	# return HttpResponse(selected_locations_list)
	# print "HHHHHH"
	# return render(request ,'easymap/index.html')
	# return render(request,'easymap/categorys.html',context_dict)
	# return HttpResponse("LOLO")
	# return render_to_response('easymap/index.html',context_dict)
	# return render_to_response('measure/qualReport.html', {'name':name, 'list_report': report, 'message':'Measures correctly saved'}, RequestContext(request))
	# return HttpResponseRedirect('/easymap/')
	# return redirect() 
	# return HttpResponseRedirect(reverse("/easymap/"))
	# return HttpResponse("BAD")

	# context_dict = {}
	# context_dict['data'] = { 'success': 'true', 'redirect': 'true', 'redirectURL': "/easymap/" }

	return HttpResponse(context_dict)





# Auxiliary function to help filter the locations_list needed.
def get_locations_list(indexes, request_string):

	if ( "-related" in request_string ):

		locations_needed = AllLocations.objects.filter(id__in=indexes)
		locations_list = list(locations_needed)

		selected_locations_list = []
		for single_location in locations_list:
			selected_locations_list.append(vars(single_location))

	else :
		# c = Category.objects.all()
		the_right_cat = ""
		# Here used a Field Type approach to filter and get the only one category.
		the_right_cat = Category.objects.get(related_names__icontains=request_string)

		if the_right_cat == "":
			return "False"

		# get the category and the locations the user needs
		locations_needed = AllLocations.objects.filter(category = the_right_cat)
		locations_list = list(locations_needed)

		selected_locations_list = []

		# indexes = numbers.split(",")
		# int() is for parsing string to integer;
		# (index - 1) is due to the defference passing from the table in HTML in which begins with 1 not 0.
		for index in indexes:
			selected_locations_list.append(vars(locations_list[int(index)-1]))

	for single_location in selected_locations_list:
	# print "Before: %s " %single_location
		del single_location['_state']
		del single_location['category_id']
		del single_location['id']

	# return 
	return selected_locations_list


# For displaying the most popular queries in the database.
def show_popular(request):

	# minus mark means descending order
	popular_queries = Query.objects.order_by('-frequency')[:2]

	queries_str = ""

	for single_query in popular_queries:
		queries_str += "<h3>"+str(single_query.content)+"<br/>"+str(single_query.frequency)+"</h3>"

	print queries_str
	return HttpResponse(queries_str)


#  For displaying newest categorys in the database.
def show_news(request):

	# minus mark means descending order
	the_newest_categorys = Category.objects.order_by('-creating_date')[:2]

	categorys_str = ""

	for single_category in the_newest_categorys:
		# print single_category
		categorys_str += "<h3>"+str(single_category.id_name)+" -- "+str(single_category.id)+"<br/>"+str(single_category.creating_date)+"</h3>"

	return HttpResponse(categorys_str)



# For displaying Category Library
def show_categorys(request):
	# context_dict={}

	# context_dict['categorys'] = Category.objects.all()

	# return render(request,'easymap/categorys.html',context_dict)
	categorys_str = "<div id='cat-container'><h3 id='cat-title' class='headline'>Category Library</h3><hr>"

	categorys = Category.objects.all()

  # $( "div" ).first().show( "fast", function showNext() {
  #   $( this ).next( "div" ).show( "fast", showNext );
  # });

	for single_category in categorys:
		# categorys_str += '<div class="cat-divs"><a class="btn btn-warning cat-btns" href="/easymap/category?category_name='+str(single_category.id_name)+'">'+str(single_category.id_name)+'</a></div>'
		categorys_str += '<a class="btn btn-warning cat-btns" href="/easymap/category?category_name='+str(single_category.id_name)+'">'+str(single_category.id_name)+'</a>'

	categorys_str += "</div>"
# href="easy/category?category_name='+str(single_category.id_name)+'
	# string = '<div class="divs"><p>Hello World</p></div><div class="divs"><p>Hello World</p></div><div class="divs"><p>Hello World</p></div><div class="divs"><p>Hello World</p></div>'

	return HttpResponse(categorys_str)


# For displaying table page.
def category(request):

	category_name = request.GET['category_name']

	context_dict = {}
	
	try:
		category = Category.objects.get(id_name=category_name)
		context_dict['category_name'] = category.id_name
		
		locations = AllLocations.objects.filter(category=category)
		context_dict['locations'] = locations
		context_dict['table_name'] = category_name
		context_dict['is_virtual_table'] = False
		context_dict['columns_name'] = get_columns_name(category.id_name)
		
	except Category.DoesNotExist:
# Need ERROR Page!! 
		pass

	return render(request,'easymap/category.html',context_dict)


# Get corresponding columns to show on table page.
# However it returns a default value because of some technical problems when showing different names on page.
def get_columns_name(category_name):

	switcher = {
		'nhs' :			["name","address","postcode","open_hours","nhs_type"],
		'subway' :		["name","address","postcode","park_and_ride","lost_property_number"],
		'library' :		["name","address","postcode","website"],
	}

	default_columns_name = ["name","address","postcode"]

	# return switcher.get(category_name, default_columns_name)
	return default_columns_name


# NOTE: put all variabales in the context_dict, then just mention the 
# name of the variablble which already in the context_dict to use it.
# it's very fast and neat! try it!
def index(request):

	# json = request.POST.get('json', False)
	# data = request.GET.get('data', False)

	# try:
	# 	message = 'You submitted: %r' % request.GET['q']
	# except MultiValueDictKeyError:
	# 	message = 'You submitted nothing!'

	# request.GET.get('json')

	# q = request.GET.get("q", None)
	# if q:
	#     message = 'q= %s' % q
	# else:
	#     message = 'Empty'

	# if request.GET.get('json'):
	# 	message = 'You submitted: %s' % request.GET['json']
	# else:
	# 	message = 'You submitted nothing!'

	context_dict = {}

	if request.GET:
		print request.GET

		data = request.GET['data']

		# print data
		data = data[1:-1];

		data_array = data.split('%')

		data_name = data_array[0].split(':')

		data_array_numbers = data_array[1].split(':')
		data_numbers = data_array_numbers[1].split(',')

		print data_name[1]
		print data_numbers

		locations_list = get_locations_list(data_numbers, data_name[1])
		context_dict['locations_list'] = locations_list

	else :
		context_dict['locations_list'] = None

	# categories = Category.objects.all()
	# context_dict['categories'] = categories	
	# context_dict['boldmessage'] = "here is the bold message!"

	print context_dict['locations_list']
	return render(request, 'easymap/index.html', context_dict)




