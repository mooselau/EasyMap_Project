# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('easymap', '0002_auto_20150802_1356'),
    ]

    operations = [
        migrations.RenameField(
            model_name='alllocations',
            old_name='location_category',
            new_name='category',
        ),
        migrations.RenameField(
            model_name='category',
            old_name='location_category',
            new_name='name',
        ),
    ]
