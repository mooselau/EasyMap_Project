# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('easymap', '0019_remove_query_destination'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='alllocations',
            name='nhs_type',
        ),
    ]
