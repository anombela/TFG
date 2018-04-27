#!/bin/bash
# ./load_tables.sh <path_data> <table>
# ./load_tables.sh /home/alex/Escritorio/Taxis_TFG/Taxis_Alex/data taxis

echo -e "FILE $1/SQLs/$2.sql" | sqlcmd

