# -*- coding: utf-8 -*-
# This Python file is used to update locations in type of JSON into database.
# !! NOTES !! That usually JSON file will contain meaningless data in the end of file, which need to be deleted.

import os
import json
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'EasyMap_Project.settings')

import django
django.setup()

from easymap.models import AllLocations, Category
import datetime

# Populate() main funciton
def populate():
    facility_cat = add_cat('life facility,community facility,youth center,library,musuem,concert hall,club,arts','life facility')

    # an extra line to import json file, and ready for read
    json_content = open("Life Facility Attendance.json")
    data = json.load(json_content)
    # this loop is used to read each single tuple in json and pass them into add_nhs()
    for single_data in data:
        add_location(single_data['Facillity name'],single_data['Address'],single_data['Postcode'],single_data['Website'],single_data['Facility description'],single_data['Monthly attendance'],single_data['Month'],single_data['Year'],facility_cat)

# This funciton is used to add extra category in Category Model
def add_cat(related_names, id_name):
    c = Category.objects.get_or_create(related_names=related_names,id_name=id_name,creating_date=datetime.date.today())[0]
    return c

# This funciton is used to add entries in AllLocation Model
def add_location(name, address, postcode, website, facility_description, monthly_attendance, month, year, category):
    n = AllLocations.objects.get_or_create(name=name,address=address,postcode=postcode,website=website,facility_description=facility_description,monthly_attendance=monthly_attendance,month=month,year=year,category=category)[0] 
    return n
    
# Start execution here
if __name__ == '__main__':
    print "Starting Easymap population script..."
    populate()
    print "All done!!"
