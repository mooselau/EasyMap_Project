# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('easymap', '0008_remove_query_query_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='query',
            name='query_type',
            field=models.CharField(default=b'None', max_length=20),
            preserve_default=True,
        ),
    ]
