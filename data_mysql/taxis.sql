#Elimina la BBDD completa si existe
DROP DATABASE IF EXISTS TFG_TAXIS;

#Crea la nueva BBDD
CREATE DATABASE TFG_TAXIS;

#Cambia a la nueva BBDD
USE TFG_TAXIS;






#############################################################
#  2016
#############################################################

#Crea la tabla
#he cambiado las coordenadas a double y los decimal por float
CREATE TABLE taxis2016 (
   vendorID INTEGER,
   tpep_pickup_datetime VARCHAR(64),
   tpep_dropoff_datetime VARCHAR(64),
   passenger_count INTEGER,
   trip_distance FLOAT,
   pickup_longitude DOUBLE,
   pickup_latitude DOUBLE,
   ratecodeID INTEGER,
   store_and_fwd_flag VARCHAR(1),
   dropoff_longitude DOUBLE NOT NULL,
   dropoff_latitude DOUBLE NOT NULL,
   payment_type INTEGER,
   fare_amount FLOAT,
   extra FLOAT,
   mta_tax FLOAT,
   tip_amount FLOAT,
   tolls_amount FLOAT,
   improvement_surcharge FLOAT,
   total_amount FLOAT
);

#Carga los datos en la tabla
LOAD DATA LOCAL INFILE '../CSVs/yellow_tripdata_2016-06.csv'
INTO TABLE taxis2016
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'
IGNORE 1 LINES;


DELIMITER //
CREATE  PROCEDURE journey_max_total_amount_trips2016()
BEGIN
  SELECT total_amount, pickup_longitude, pickup_latitude, dropoff_longitude, dropoff_latitude
  FROM taxis2016
  ORDER BY total_amount
  DESC LIMIT 1;
END //

CREATE PROCEDURE journey_min_total_amount_trips2016()
BEGIN 
  SELECT total_amount, pickup_longitude, pickup_latitude, dropoff_longitude, dropoff_latitude
  FROM taxis2016
  ORDER BY total_amount
  ASC LIMIT 1;
END //

CREATE PROCEDURE max_distance_trips2016()
BEGIN 
  SELECT trip_distance, pickup_longitude, pickup_latitude, dropoff_longitude, dropoff_latitude
  FROM taxis2016
  ORDER BY trip_distance
  DESC LIMIT 1;
END //

CREATE PROCEDURE min_distance_trips2016()
BEGIN 
  SELECT trip_distance, pickup_longitude, pickup_latitude, dropoff_longitude, dropoff_latitude
  FROM taxis2016
  ORDER BY trip_distance
  ASC LIMIT 1;
END //

#, in norte_pu varchar, in este_pu varchar, in sur_pu varchar, in oeste varchar)

#localhost:3000/TFG_TAXIS/get_info_2016/0,90,180,-90,-180 ejemplo url
CREATE PROCEDURE get_info_2016(in option_ int, in norte_pu DOUBLE, in este_pu DOUBLE, in sur_pu DOUBLE, in oeste_pu DOUBLE
                                , in norte_do DOUBLE, in este_do DOUBLE, in sur_do DOUBLE, in oeste_do DOUBLE)       
BEGIN

  IF option_ = 0 THEN

    SELECT * FROM taxis2016
    WHERE pickup_latitude BETWEEN sur_pu and norte_pu AND pickup_longitude BETWEEN oeste_pu and este_pu
    and dropoff_latitude BETWEEN sur_do and norte_do AND dropoff_longitude BETWEEN oeste_do and este_do
    ORDER BY TPEP_PICKUP_DATETIME asc
    LIMIT 10000;#esto es temporal

    SELECT max(total_amount) as max_amount, min(total_amount) as min_amount,
    max(trip_distance) as max_distance, min(trip_distance) as min_distance
    FROM taxis2016
    WHERE pickup_latitude BETWEEN sur_pu and norte_pu AND pickup_longitude BETWEEN oeste_pu and este_pu
    and dropoff_latitude BETWEEN sur_do and norte_do AND dropoff_longitude BETWEEN oeste_do and este_do;


  ELSEIF option_ = 1 THEN

    SELECT * FROM taxis2016
    WHERE pickup_latitude BETWEEN sur_pu and norte_pu AND pickup_longitude BETWEEN oeste_pu and este_pu
    and dropoff_latitude BETWEEN sur_do and norte_do AND dropoff_longitude BETWEEN oeste_do and este_do
    ORDER BY total_amount DESC
    LIMIT 1;

  ELSEIF option_ = 2 THEN

    SELECT * FROM taxis2016
    WHERE pickup_latitude BETWEEN sur_pu and norte_pu AND pickup_longitude BETWEEN oeste_pu and este_pu
    and dropoff_latitude BETWEEN sur_do and norte_do AND dropoff_longitude BETWEEN oeste_do and este_do
    ORDER BY total_amount ASC
    LIMIT 1;

  ELSEIF option_ = 3 THEN
    
    SELECT * FROM taxis2016
    WHERE pickup_latitude BETWEEN sur_pu and norte_pu AND pickup_longitude BETWEEN oeste_pu and este_pu
    and dropoff_latitude BETWEEN sur_do and norte_do AND dropoff_longitude BETWEEN oeste_do and este_do
    ORDER BY trip_distance DESC
    LIMIT 1;

  ELSEIF option_ = 4 THEN

    SELECT * FROM taxis2016
    WHERE pickup_latitude BETWEEN sur_pu and norte_pu AND pickup_longitude BETWEEN oeste_pu and este_pu
    and dropoff_latitude BETWEEN sur_do and norte_do AND dropoff_longitude BETWEEN oeste_do and este_do
    ORDER BY trip_distance ASC
    LIMIT 1;

  ELSE

    SELECT NULL;

  END IF;

 
END //


#de comun

#Pasarle el año:
#year_trip = 2016 0 2017 ===> total trayectos anulados
CREATE PROCEDURE total_voided_trips()
BEGIN
  SELECT count(payment_type) AS total_voided_trips
  FROM taxis2016
  WHERE  payment_type = 6;
END //



#Pasarle el año:
#year_trip = 2016 0 2017 ===> total trayectos no cargados al cliente
CREATE PROCEDURE total_no_charge_trips()
BEGIN
   SELECT count(payment_type) AS total_no_charge_trips
   FROM taxis2016
   WHERE  payment_type = 3;
END //


#Pasarle el año:
#year_trip = 2016 0 2017 ; payment_type = 1 o 2 ===> total trayectos pagados con tarjeta crédito o efectivo
CREATE PROCEDURE total_payment_type_trips (in type_ int)
BEGIN
   SELECT count(payment_type) AS total_payment_type_trips
   FROM taxis2016
   WHERE  payment_type = type_;
END //


#Pasarle el año:
#year_trip = 2016 0 2017 ; ratecodeID = 1,5 o 6 ===> total trayectos con tarifas estándar,negociada o grupos
CREATE PROCEDURE total_rate_code_trips (in ratecodeID_ int)
BEGIN
   SELECT count(ratecodeID) AS total_rate_code_trips
   FROM taxis2016
   WHERE  ratecodeID =ratecodeID_;
END //


#Pasarle el año:
#year_trip = 2016 0 2017 ; vendorID = 1 o 2 ===> Creative Mobile Technologies o VeriFone que midió el trayecto
CREATE PROCEDURE total_passengers_vendorId ( in vendorID_ int)
BEGIN
   SELECT SUM(passenger_count) AS total_passengers_vendorId
   FROM taxis2016
   WHERE  vendorID = vendorID_;
END //

#Pasarle el año:
#year_trip = 2016 0 2017 ===> Media de pasajeros que se montan en un taxi.
CREATE PROCEDURE average_passengers_taxi ()
BEGIN
   SELECT AVG(passenger_count) AS average_passengers_taxi
   FROM taxis2016;
END//



DELIMITER ;
#############################################################
#  2017
#############################################################
CREATE TABLE taxis2017 (
   vendorID INTEGER,
   tpep_pickup_datetime VARCHAR(64),
   tpep_dropoff_datetime VARCHAR(64),
   passenger_count INTEGER,
   trip_distance FLOAT,
   ratecodeID INTEGER,
   store_and_fwd_flag VARCHAR(1),
   PULocationID INTEGER NOT NULL,
   DOLocationID INTEGER NOT NULL,
   payment_type INTEGER,
   fare_amount FLOAT,
   extra FLOAT,
   mta_tax FLOAT,
   tip_amount FLOAT,
   tolls_amount FLOAT,
   improvement_surcharge FLOAT,
   total_amount FLOAT
);

#Carga los datos en la tabla
LOAD DATA LOCAL INFILE '../CSVs/yellow_tripdata_2017-06.csv'
INTO TABLE taxis2017
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'
IGNORE 2 LINES;















#############################################################
#  comun
#############################################################
