# This is the models file, which designed the fundamental models for the database.
# !! NOTE:
# Any changes need to run 'python manage.py makemigrations easymap', 'python manage.py syncdb' and 'python manage.py migrate' individually.

from django.db import models

# Query is defined to hold all queries inputed into the system.
# Query_type could currently be : 1. 'single-keyword' ; 2. 'keywords'.
# Destination will be deleted due to useless in the iterative designing.
# Keywords hold all words while content holds the original information from users.
# In this stage, keywords field is only used for holding one word. 
# Content holds all information recieved by the system, might be a word or words with characters.
# Creating_date & time might be still useful in future version.
# Frequency is for searching popular queries.
class Query(models.Model):
    query_type = models.CharField(default="None", max_length=20)
    keywords = models.CharField(default="None", max_length=128)
    content = models.TextField()
    creating_time = models.TimeField()
    creating_date = models.DateField()
    frequency = models.IntegerField(default=0)
    
    def __unicode__(self):
        return self.content

# Category is defined to hold all related information about all locations
# Related_names is a series of words which have similar meanning with the name,
# having this field will help to find the right part in the AllLocation table.
class Category(models.Model):
    id_name = models.CharField(max_length=20,unique=True)
    related_names = models.TextField()
    creating_date = models.DateField()

    def __unicode__(self):
        return self.id_name

# AllLocations is defined to hold complete information on all locations in local database,
# different locations have different fields, so this table has various fields used to hold all locations.
# Till this time, This database already has locations on : libraries, subway stations, nhs locations, etc.
class AllLocations(models.Model):
    # first three fields are common fields for each kind of location.
    name = models.CharField(max_length=128) 
    address = models.TextField()
    postcode = models.CharField(max_length=128)
    
    # these following fields are just for nhs.
    open_hours = models.TextField(blank=True)
    nhs_type = models.CharField(default="",max_length=20,blank=True)

    #these following fields are for subways. 
    park_and_ride = models.CharField(max_length=5,blank=True)
    lost_property_number = models.CharField(max_length=20, blank=True)
    nearby = models.TextField(blank=True)
    
    # these following fields are for libraries.
    website = models.URLField(default="", blank=True)

    # these following fields are for life facilities.
    facility_description = models.TextField(default="",blank=True)
    monthly_attendance = models.CharField(default="",max_length=20, blank=True)
    month = models.CharField(default="",max_length=20, blank=True)
    year = models.CharField(default="",max_length=20, blank=True)

    # this field will be used to store any extra information not used in this stage from data sets 
    notes = models.TextField(default="",blank=True)

    # this is the foreign key linked to Category model.
    category = models.ForeignKey(Category)

    def __unicode__(self):
        return self.name

# All default and meaningless value are:
# None, # ( which was used in previous verison but still existing in database in URL field)
