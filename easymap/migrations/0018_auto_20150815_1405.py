# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('easymap', '0017_auto_20150815_1340'),
    ]

    operations = [
        migrations.AlterField(
            model_name='query',
            name='keywords',
            field=models.CharField(default=b'None', max_length=128),
        ),
    ]
