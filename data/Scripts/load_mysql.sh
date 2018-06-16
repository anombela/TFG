#!/bin/bash
# ./load_mysql.sh <path_data>
# ./load_mysql.sh /home/alex/Escritorio/TFG-taxis


echo "create database TFG_TAXIS" | mysql -u root
cd $1/SQLs_mysql/
mysql -u root TFG_TAXIS -e "source taxis2016.sql"
mysql -u root TFG_TAXIS -e "source taxis2017.sql"
mysql -u root TFG_TAXIS -e "source commun.sql"
cd $1/CSVs
mysql -u root TFG_TAXIS -e "LOAD DATA LOCAL INFILE 'yellow_tripdata_2016-06.csv' INTO TABLE taxis2016 FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES;"
mysql -u root TFG_TAXIS -e "LOAD DATA LOCAL INFILE 'yellow_tripdata_2017-06.csv' INTO TABLE taxis2017 FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES;"
mysql -u root TFG_TAXIS -e "LOAD DATA LOCAL INFILE 'taxi-zone-lookup-with-ntacode.csv' INTO TABLE location FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES;"
mysql -u root TFG_TAXIS -e "LOAD DATA LOCAL INFILE 'central_park_weather.csv' INTO TABLE central_park_weather FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES;"
