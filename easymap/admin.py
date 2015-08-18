from django.contrib import admin
from easymap.models import Category, AllLocations, Query

# Update the registeration to include this customized interface
admin.site.register(Category)
admin.site.register(AllLocations)
admin.site.register(Query)