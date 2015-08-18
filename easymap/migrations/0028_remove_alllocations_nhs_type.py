# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('easymap', '0027_alllocations_nhs_type'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='alllocations',
            name='nhs_type',
        ),
    ]
