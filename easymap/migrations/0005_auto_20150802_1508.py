# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('easymap', '0004_auto_20150802_1455'),
    ]

    operations = [
        migrations.AlterField(
            model_name='alllocations',
            name='lost_property_number',
            field=models.CharField(max_length=20, blank=True),
        ),
    ]
