# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('easymap', '0005_auto_20150802_1508'),
    ]

    operations = [
        migrations.AddField(
            model_name='alllocations',
            name='website',
            field=models.URLField(default=b'#', blank=True),
            preserve_default=True,
        ),
    ]
