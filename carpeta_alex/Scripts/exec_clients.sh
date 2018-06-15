#!/bin/bash
# ./exec_clients.sh <path_data>
# ./exec_clients.sh /home/alex/Escritorio/TFG-taxis/data/Scripts clientes_mysql.sh

inicio_ns=`date +%s%N`
inicio=`date +%s`

for i in {1..10}
do
   bash $1/$2
done

fin_ns=`date +%s%N`
fin=`date +%s`
let total_ns=$fin_ns-$inicio_ns
let total=$fin-$inicio
echo "HA TARDADO: $total_ns nanosegudos, $total segundos"