# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-04-15 20:36
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('gtrent', '0014_auto_20160415_2015'),
    ]

    operations = [
        migrations.AlterField(
            model_name='yelp',
            name='yelp',
            field=models.ForeignKey(default='111', on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='gtrent.Yelp_Details'),
        ),
    ]
