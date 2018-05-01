CREATE TABLE taxis2016 (
   vendorID INTEGER,
   tpep_pickup_datetime VARCHAR(64),
   tpep_dropoff_datetime VARCHAR(64),
   passenger_count INTEGER,
   trip_distance DECIMAL,
   pickup_longitude DECIMAL,
   pickup_latitude DECIMAL,
   ratecodeID INTEGER,
   store_and_fwd_flag VARCHAR(1),
   dropoff_longitude DECIMAL NOT NULL,
   dropoff_latitude DECIMAL NOT NULL,
   payment_type INTEGER,
   fare_amount DECIMAL,
   extra DECIMAL,
   mta_tax DECIMAL,
   tip_amount DECIMAL,
   tolls_amount DECIMAL,
   improvement_surcharge DECIMAL,
   total_amount DECIMAL
);


CREATE PROCEDURE journey_max_total_amount_trips2016
  AS 
    SELECT total_amount, pickup_longitude, pickup_latitude, dropoff_longitude, dropoff_latitude
    FROM taxis2016
    ORDER BY total_amount
    DESC LIMIT 1;

CREATE PROCEDURE journey_min_total_amount_trips2016
  AS 
    SELECT total_amount, pickup_longitude, pickup_latitude, dropoff_longitude, dropoff_latitude
    FROM taxis2016
    ORDER BY total_amount
    ASC LIMIT 1;

CREATE PROCEDURE total_voided_trips2016
  AS 
    SELECT count(payment_type) AS total_voided_trips
    FROM taxis2016
    WHERE payment_type = 6;

CREATE PROCEDURE total_no_charge_trips2016
  AS 
    SELECT count(payment_type) AS total_no_charge_trips
    FROM taxis2016
    WHERE payment_type = 3;


-- Pasarle el tipo de pago:
  -- payment_type = 1 ===> Tarjeta crédito
  -- payment_type = 2 ===> Efectivo
  CREATE PROCEDURE total_payment_type_trips2016
  AS 
    SELECT count(payment_type) AS total_payment_type_trips
    FROM taxis2016
    WHERE payment_type = ?;


-- Pasarle el tipo de tarifa aplicada al viaje:
  -- ratecodeID = 1 ===> Tarifa estándar
  -- ratecodeID = 5 ===> Tarifa negociada
  -- ratecodeID = 6 ===> Tarifa de grupos
  CREATE PROCEDURE total_rate_code_trips2016
  AS 
    SELECT count(ratecodeID) AS rate_code_trip
    FROM taxis2016
    WHERE ratecodeID = ?;


-- Pasarle el vendorId con el que se hizo el trayecto:
  -- vendorID = 1 ===> Creative Mobile Technologies, LLC
  -- vendorID = 2 ===> VeriFone Inc
  CREATE PROCEDURE total_passengers_vendorId_trips2016
  AS 
    SELECT SUM(passenger_count) AS total_passengers_vendorId 
    FROM taxis2016 
    WHERE vendorID = ?;

  CREATE PROCEDURE average_passengers_taxi_trips2016
  AS 
    SELECT AVG(passenger_count) AS average_passengers_taxi
    FROM taxis2016;

  
CREATE PROCEDURE
  FROM CLASS max_distance_trips2016;

CREATE PROCEDURE
  FROM CLASS min_distance_trips2016;