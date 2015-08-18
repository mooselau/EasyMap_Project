# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('easymap', '0021_alllocations_nhs_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='alllocations',
            name='website',
            field=models.URLField(null=True, blank=True),
        ),
    ]
