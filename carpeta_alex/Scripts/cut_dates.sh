#!/bin/bash
# ./cut_dates.sh <path_CSVs> <cut_rows> <csv>
# ./cut_dates.sh /home/alex/Escritorio/TFG-taxis/CSVs 100000 yellow_tripdata_2017-06.csv

head -n $2 $1/$3 > $1/cut.csv
mv $1/cut.csv $1/$3
