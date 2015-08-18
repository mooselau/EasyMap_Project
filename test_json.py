# -*- coding: utf-8 -*-
import json, csv
import urllib2



data_file = open('glasgow-libraries.json')
data = json.load(data_file)

print data[0]['Facillity name ']

# print "All done!"

# url = "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA"
# f = urllib2.urlopen(url)
# content = f.read()
# data = json.loads(content)
# results = data['results'][0]['geometry']['location']
# print results.encode('ascii')
# print data['results']['geometry']['location']
# data = json.load(model)

# pprint data['results']['geometry']