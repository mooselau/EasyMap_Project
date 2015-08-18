# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('easymap', '0014_remove_query_keywords'),
    ]

    operations = [
        migrations.AddField(
            model_name='query',
            name='keywords',
            field=models.CharField(default=b'None', max_length=128, null=True),
            preserve_default=True,
        ),
    ]
