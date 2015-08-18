# -*- coding: utf-8 -*-
# This Python file is used to update locations in type of JSON into database.

import os
import json
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'EasyMap_Project.settings')

import django
django.setup()

from easymap.models import AllLocations, Category

import datetime

def populate():
    test_cat = add_cat('test','testing')

    # add_location(single_data['Facillity name '],single_data['Address '],single_data['Postcode'],single_data['Website'],test_cat)
    add_location("Partick Library","305 Dumbarton Road","G11 6AB","www.testing.com",test_cat)


# This funciton is used to add extra category in Category Model
def add_cat(related_names, id_name, creating_date = datetime.date.today()):
    c = Category.objects.get_or_create(related_names=related_names,id_name=id_name,creating_date=creating_date)[0]
    return c

# This funciton is used to add entries in AllLocation Model
def add_location(name, address, postcode, website, category):
    n = AllLocations.objects.get_or_create(name=name,address=address,postcode=postcode,website=website,category=category)[0] 
    return n
    
# Start execution here !
if __name__ == '__main__':
    print "Starting Easymap population script..."
    populate()
    print "All Done!!"