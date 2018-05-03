#!/bin/bash
# ./start_voltdb.sh <path_exec_output>
# ./start_voltdb.sh > /home/alex/Escritorio/TFG-taxis/data/files/exec_output/voltdb.log &

voltdb init --force
voltdb start
