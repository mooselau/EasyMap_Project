# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('easymap', '0018_auto_20150815_1405'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='query',
            name='destination',
        ),
    ]
