# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('easymap', '0009_query_query_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='alllocations',
            name='website',
            field=models.URLField(default=b'None', blank=True),
        ),
    ]
