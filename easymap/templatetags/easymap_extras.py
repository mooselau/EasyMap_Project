# This will be a filter for table page.

from django import template

register = template.Library()

# create and regist the filter in app
@register.filter
def replace(value, arg):
	return value.replace(arg,"-")

