# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('easymap', '0023_auto_20150815_1612'),
    ]

    operations = [
        migrations.AlterField(
            model_name='alllocations',
            name='nhs_type',
            field=models.CharField(default=b'None', max_length=20, blank=True),
        ),
    ]
