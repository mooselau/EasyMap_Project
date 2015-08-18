# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('easymap', '0003_auto_20150802_1432'),
    ]

    operations = [
        migrations.RenameField(
            model_name='alllocations',
            old_name='location_type',
            new_name='nhs_type',
        ),
    ]
