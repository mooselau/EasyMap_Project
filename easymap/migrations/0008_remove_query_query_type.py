# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('easymap', '0007_auto_20150804_1150'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='query',
            name='query_type',
        ),
    ]
