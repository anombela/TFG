#!/bin/bash
# ./load_csvs.sh <path_data> <limitrows> <csv1> <table1> <csv2> <table2>
# ./load_csvs.sh /home/alex/Escritorio/TFG-taxis/data 10000 yellow_tripdata_2017-12.csv taxis taxi-zone-lookup-with-ntacode.csv Location

csvloader --skip 1 --file $1/../CSVs/$3 $4 --limitrows $2
csvloader --skip 1 --file $1/../CSVs/$5 $6 --limitrows $2

