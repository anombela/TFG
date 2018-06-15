#!/bin/bash
# ./load_csvs.sh <path_data> <limitrows> <csv1> <table1>
# ./load_csvs.sh /home/alex/Escritorio/TFG-taxis/data 10000 yellow_tripdata_2017-06.csv taxis2017

csvloader --skip 1 --file $1/../CSVs/$3 $4 --limitrows $2

