from django.http import HttpResponse, HttpResponseRedirect
from django.utils.datastructures import MultiValueDictKeyError
from django.shortcuts import render
from easymap.models import Category, Query, AllLocations
import json
import urllib2
import time
import random
import re

# Auxiliary function: for getting 5 objects that randomly distribute in the set
# Parameters: locations_list_length is the maximum number the random number can reach.
def get_five_radom_digits(locations_list_length):

	# Give the total number of the objects.
	# last = al.objects.count() - 1 in Model.objects.all() level
	last = locations_list_length - 1
	# get the around middle number. int / int = int, that's in Python.
	# middle = al.objects.count()/2 in Model.objects.all() level
	middle = locations_list_length/2
	# get first 2 numbers in the first half part of the total number
	index_1 = random.randint(0, middle-1)
	index_2 = random.randint(0, middle-1)
	# This keeps the first 2 ints definitely not the same, provided the total number is larger.
	if index_1 == index_2 : 
		index_2 = middle-1

	index_3 = middle
	# get the last 2 numbers in the second half of the total numbers,
	# and keep the two nor the same
	index_4 = random.randint(middle+1, last)
	index_5 = random.randint(middle+1, last)
	if index_4 == index_5:
		index_5 = last

	index_list = [index_1, index_2, index_3, index_4, index_5]
	return index_list

# Auxiliary function: for creating a new query.
# Parameters: query_type is the type of each query, in this stage only "single-keyword" type.
# 	keywords are the keywords extracted from content.
#   content is the original content from the user input.
def save_query(query_type, keywords, content):

	# When creating category date, can use 'datetime.date.today()'
	current_time = time.strftime("%H:%M:%S")
	current_date = time.strftime("%Y-%m-%d")

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
				, creating_time = current_time, creating_date = current_date, frequency=1)

	return q

# Main function: for user searching.
# Parameters: request is the searching request sent from the user browser.
def query_search(request):
		
	# To judge if the reqeust sent from tagCloud or the searching bar. 
	# If the reqeust sent from tagCloud, it'd be using GET method,
	# otherwise, it'd be using POST method.
	if(request.method == 'GET'):
		content = request.GET['search-content']

	else :
		content = request.POST['search-content']

	# A validating process is setting in leftmenu.js.
	query_type = 'single-keyword'
	keywords = content
	query = save_query(query_type, keywords, content)

	# get the category and the locations the user needs
	locations_needed = AllLocations.objects.filter(name__icontains=query.keywords)

	context_dict = {}
	context_dict['locations'] = locations_needed
	context_dict['table_name'] = str(keywords)+"-related"
	context_dict['is_virtual_table'] = True
	context_dict['columns_name'] = ["name","address","postcode"]
	# context_dict['columns_name'] = get_columns_name(keywords)

	return render(request,'easymap/category.html', context_dict)

# Auxiliary function: to help filter the locations_list needed.
# Parameters: indexes are the number list containing the ids sent from the user browser.
# 	request_string is the the name of the category requested.
def get_locations_list(indexes, request_string):

	if ( "-related" in request_string ):

		locations_needed = AllLocations.objects.filter(id__in=indexes)
		locations_list = list(locations_needed)

		selected_locations_list = []
		for single_location in locations_list:
			selected_locations_list.append(vars(single_location))

	else :
		
		the_right_cat = ""
		# Here used a Field Type approach to filter and get the only one category.
		the_right_cat = Category.objects.get(id_name__icontains=request_string)

		if the_right_cat == "":
			return render(request, 'easymap/error.html')
			# return "False"

		# get the category and the locations the user needs
		locations_needed = AllLocations.objects.filter(category = the_right_cat)
		locations_list = list(locations_needed)

		selected_locations_list = []

		# int() is for parsing string to integer;
		# (index - 1) is due to the defference passing from the table in HTML in which begins with 1 not 0.
		for index in indexes:
			selected_locations_list.append(vars(locations_list[int(index)-1]))

	for single_location in selected_locations_list:
		del single_location['_state']
		del single_location['category_id']
		del single_location['id']

	return selected_locations_list

# Main Function: For displaying the most popular queries in the database.
# Parameters: request is the popular queries request sent from the user browser.
def show_popular(request):

	# minus mark means descending order
	popular_queries = Query.objects.order_by('-frequency')[:5]

	queries = []
	for single_query in popular_queries:
		queries.append({"name": single_query.content,"data": single_query.frequency})

	queries_json = json.dumps(queries)
	return HttpResponse(queries_json)

# Main Function: For displaying newest categorys in the database.
# Parameters: request is the most recent categories request sent from the user browser.
def show_news(request):

	# minus mark means descending order
	the_newest_categorys = Category.objects.order_by('-creating_date')[:5]

	categorys_str = "<div id='news-div'><ul class='list-group news-list'>"
	categorys_str += "<li class='list-group-item new-list-top'><span class='badge news-top'>Date</span>New Created Name</li>"

	for single_category in the_newest_categorys:
		categorys_str += "<li class='list-group-item news-list-li'>"+"<span class='badge news-span'>"+ str(single_category.creating_date) +"</span>"+ "<a class='news-list-a' href='/easymap/category?category_name="+str(single_category.id_name)+"'>" + str(single_category.id_name) + "</a>" +"</li>"

	categorys_str += "</ul></div>"

	return HttpResponse(categorys_str)


# Main Function: For displaying Category Library
# Parameters: request is the showing categories request sent from the user browser.
def show_categorys(request):
	
	categorys_str = "<div id='cat-container'><h3 id='cat-title' class='headline'>Category Library</h3><hr>"

	categorys = Category.objects.all()

	for single_category in categorys:
		categorys_str += '<a class="btn btn-success cat-btns" href="/easymap/category?category_name='+str(single_category.id_name)+'">'+str(single_category.id_name)+'</a>'

	categorys_str += "</div>"

	return HttpResponse(categorys_str)

# Main Function: For displaying table page.
# Parameters: request is the asking for show entries under a category sent from the user browser.
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
		context_dict['columns_name'] = ["name","address","postcode"]
		# context_dict['columns_name'] = get_columns_name(category.id_name)
		
	except Category.DoesNotExist:
		return render(request, 'easymap/error.html')
		# pass

	return render(request,'easymap/category.html',context_dict)

# Auxiliary Function.
# Get corresponding columns to show on table page.
# However it returns a default value because of some technical problems when showing different names on page.
# def get_columns_name(category_name):

# 	switcher = {
# 		'nhs' :			["name","address","postcode","open_hours","nhs_type"],
# 		'subway' :		["name","address","postcode","park_and_ride","lost_property_number"],
# 		'library' :		["name","address","postcode","website"],
# 	}

# 	default_columns_name = ["name","address","postcode"]

# 	# return switcher.get(category_name, default_columns_name)
# 	return default_columns_name


# Auxiliary Function: Get some random queries.
def get_random_queries():

	query_num = Query.objects.count()
	indexes = get_five_radom_digits(query_num)
	indexes += get_five_radom_digits(query_num)
	indexes += get_five_radom_digits(query_num)
	indexes += get_five_radom_digits(query_num)

	random_queries = []
	all_quries = Query.objects.all()

	for index in indexes:
		random_queries.append(all_quries[index])

	return random_queries


# Main Function: this is the most important main function to render the home page.
# Parameters: request is the home page request sent from the user browser.
def index(request):

	context_dict = {}

	if request.GET:

		data = request.GET['data']
		data = data[1:-1];
		data_array = data.split('%')

		# the request category name
		data_name = data_array[0].split(':')

		# the request numbers
		data_array_numbers = data_array[1].split(':')
		data_numbers = data_array_numbers[1].split(',')

		# get the locations needed from an auxiliary function get_locations_list().
		locations_list = get_locations_list(data_numbers, data_name[1])
		context_dict['locations_list'] = locations_list

	else :
		# If there is no extra information in the request, then give a None result.
		context_dict['locations_list'] = None

	random_tags_query = get_random_queries()
	context_dict['tags'] = random_tags_query

	print context_dict['locations_list']
	return render(request, 'easymap/index.html', context_dict)




