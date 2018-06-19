#!/bin/bash
# ./exec_clients.sh <path_data>
# ./exec_clients.sh /home/alex/Escritorio/TFG-taxis/data/Scripts clientes_mysql.sh


#ejecutando como time ./ ...... se ven los tiempos de ejcución
inicio_ns=`date +%s%N`
inicio=`date +%s`
FAIL=0

for i in {1..10}
do
   bash $1/$2 > /dev/null &
done



for job in `jobs -p`
do
   	
    wait $job || let "FAIL+=1"
    echo "Acaba:" $job
done

#echo $FAIL

if [ "$FAIL" == "0" ];
then
	fin_ns=`date +%s%N`
	fin=`date +%s`
	let total_ns=$fin_ns-$inicio_ns
	let total=$fin-$inicio
	echo "HA TARDADO: $total_ns nanosegudos, $total segundos"
else
	echo "FAIL! ($FAIL)"
fi