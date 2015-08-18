# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('easymap', '0011_category_creating_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='query',
            name='keywords',
            field=models.CharField(default=None, max_length=128),
            preserve_default=False,
        ),
    ]
