# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('easymap', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='alllocations',
            name='lost_property_number',
            field=models.IntegerField(default=0, blank=True),
        ),
    ]
