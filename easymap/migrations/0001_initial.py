# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AllLocations',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=128)),
                ('address', models.TextField()),
                ('postcode', models.CharField(max_length=128)),
                ('open_hours', models.TextField(blank=True)),
                ('location_type', models.CharField(max_length=20, blank=True)),
                ('park_and_ride', models.CharField(max_length=5, blank=True)),
                ('lost_property_number', models.IntegerField(blank=True)),
                ('nearby', models.TextField(blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('related_names', models.TextField()),
                ('location_category', models.CharField(unique=True, max_length=20)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Query',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('query_type', models.CharField(max_length=20)),
                ('destination', models.CharField(max_length=128)),
                ('content', models.TextField()),
                ('creating_time', models.TimeField()),
                ('creating_date', models.DateField()),
                ('frequency', models.IntegerField(default=0)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='alllocations',
            name='location_category',
            field=models.ForeignKey(to='easymap.Category'),
            preserve_default=True,
        ),
    ]
