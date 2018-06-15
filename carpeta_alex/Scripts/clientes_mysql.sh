#!/bin/bash

mysql -u root TFG_TAXIS -e "SELECT trip_distance, pickup_longitude, pickup_latitude, dropoff_longitude, dropoff_latitude FROM taxis2016 ORDER BY trip_distance DESC LIMIT 1;"