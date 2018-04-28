#!/bin/bash
# ./load_all.sh <path_voltdb> <path_data> <limitrows> <csv_tripdata_colour> <csv_taxi_zones>
# ./load_all.sh /home/alex/Escritorio/TFG/voltdb/voltdb /home/alex/Escritorio/TFG-taxis/data 10000 yellow_tripdata_2017-12.csv taxi-zone-lookup-with-ntacode.csv

javac -cp "$CLASSPATH:$1/*" $2/files/*.java
cd $2/files
jar cvf $2/files/storedprocs.jar *.class
echo -e "load classes $2/files/storedprocs.jar" | sqlcmd
echo -e "FILE $2/SQLs/taxis.sql" | sqlcmd
csvloader --skip 1 --file $2/../CSVs/$4 taxis --limitrows $3
csvloader --skip 1 --file $2/../CSVs/$5 Location --limitrows $3
