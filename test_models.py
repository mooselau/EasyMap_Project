# -*- coding: utf-8 -*-

import os
import json
import random
from json import dumps,JSONEncoder,JSONDecoder
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'EasyMap_Project.settings')

import django
django.setup()

from easymap.models import Query, AllLocations, Category

def test():
	al = AllLocations.objects.filter(id__in=[11,39,42,46,51,52,779,791])

	for single_al in al:
		print al

	return 

# Start execution here
if __name__ == '__main__':
    print "Starting Easymap population script..."
    test()
    print "All done!!"

# get 5 objects that randomly distribute in the set
def get_obejcts():

	# icontains is case-insensitive lookup type
	cat = Category.objects.get(related_names__icontains="subway")
	al = AllLocations.objects.filter(category=cat)
	locations_list_length = len(al)
	locations_list = list(al)

	print len(al)
	print list(al)

	# print list(al)[0]

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
		
	print "%d %d %d %d %d" % (index_1, index_2, index_3, index_4, index_5)

	# for i in range(1,5):
	print locations_list[index_1]
	print locations_list[index_2]
	print locations_list[index_3]
	print locations_list[index_4]
	print locations_list[index_5]

	return
		
#  methods in Django
def interesting():
	# length of the Query_Set 
	# list all elements within the Query_Set
	print len(al)
	print list(al)

	return 

def find_query():

	retquest_string = "library"
	c = Category.objects.all()

	for single_c in c:
		if retquest_string in single_c.related_names:
			q = single_c
			break

	al = AllLocations.objects.filter(category = q)
	
	alllist = []
	for single_al in al:
		alllist.append(vars(single_al))

	print alllist
	# q = Query.objects.create(content="hehehehe", destination = "Shanghai", frequency=0
	# 	,creating_time="09:09",creating_date="2000-09-09")
	# frequency = q.frequency +1
	# q.frequency = frequency
	# q.save()

def to_json():
	james = Query("where is","Tianjin","contentblablabla","09:09","2010-09-09",1)
	moose = Query("how to","Tongling","contentblablabla","09:09","2010-09-09",1)

	namediclist = []
	namediclist.append(vars(james))
	namediclist.append(vars(moose))
	print namediclist
	# namediclist.append(vars(moose))
	# print vars(james)

	# jsondata = json.dumps(james)
	# print jsondata

# Print out what we have added to the user.
# for nhs in NHSLocatoin.objects.all():
# 	print " name: %s " % nhs.name

# for single_data in data:
# print "name: %s type: %s address: %s /npostcode: %s openhours: %s" % (single_data['name'],single_data['location_type'],single_data['addr1']+single_data['addr2'],single_data['postcode'],single_data['openhours'])	