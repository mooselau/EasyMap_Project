# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('easymap', '0010_auto_20150807_0038'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='creating_date',
            field=models.DateField(default=datetime.date(2015, 8, 14)),
            preserve_default=False,
        ),
    ]
