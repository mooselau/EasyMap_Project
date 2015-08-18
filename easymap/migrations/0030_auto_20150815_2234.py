# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('easymap', '0029_alllocations_nhs_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='alllocations',
            name='facility_description',
            field=models.TextField(default=b'', blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='alllocations',
            name='month',
            field=models.CharField(default=b'', max_length=20, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='alllocations',
            name='monthly_attendance',
            field=models.CharField(default=b'', max_length=20, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='alllocations',
            name='notes',
            field=models.TextField(default=b'', blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='alllocations',
            name='year',
            field=models.CharField(default=b'', max_length=20, blank=True),
            preserve_default=True,
        ),
    ]
