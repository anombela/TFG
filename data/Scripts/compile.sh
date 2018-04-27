#!/bin/bash
# ./compile.sh <path_voltdb> <path_data>
# ./compile.sh /home/alex/Escritorio/TFG/voltdb/voltdb /home/alex/Escritorio/Taxis_TFG/Taxis_Alex/data

javac -cp "$CLASSPATH:$1/*" $2/files/*.java
cd $2/files
jar cvf $2/files/storedprocs.jar *.class
echo -e "load classes $2/files/storedprocs.jar" | sqlcmd
#echo -e "FILE $2/SQLs/taxis.sql" | sqlcmd

