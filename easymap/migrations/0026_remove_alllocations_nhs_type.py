# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('easymap', '0025_auto_20150815_1614'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='alllocations',
            name='nhs_type',
        ),
    ]
