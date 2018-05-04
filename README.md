# TFG
repositorio para el TFG de Alfonso y Alejandro

### EJEMPLO CARGAR DATOS:

1. Encendemos voltdb ejecutando en background:

    ```
       $ cd /home/alex/Escritorio/TFG-taxis/data/Scripts/
       $ ./start_voltdb.sh > /home/alex/Escritorio/TFG-taxis/data/files/exec_output/voltdb.log &
    ```
2. Dejamos que inicie Voltdb y tras 10 segundos de espera:

    ```	
       $ ./load_all.sh /home/alex/Escritorio/TFG/voltdb/voltdb /home/alex/Escritorio/TFG-taxis/data 10000 yellow_tripdata_2016-06.csv yellow_tripdata_2017-06.csv taxi-zone-lookup-with-ntacode.csv central_park_weather.csv
    ```
3. Ya tenemos todas las tablas cargadas y listas para usar.

4. Si se producen cambios en el codigo:
    ```
        $ fg 1
        $ CTRL + C
        $ Volvemos a ejecutar el paso 1.
    ```
