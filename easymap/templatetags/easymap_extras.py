# This will be a filter for table page.

from django import template
from django.template.defaultfilters import stringfilter

register = template.Library()

# create and regist the filter in app
@register.filter
def replace(value, arg):
	return value.replace(arg,"-")


@register.filter
@stringfilter
def to_string(value):
    return str(value)