CREATE TABLE central_park_weather (
   station VARCHAR(64),
   name VARCHAR(64),
   date_time VARCHAR(64),
   awnd DECIMAL,
   prcp DECIMAL,
   snow DECIMAL,
   snwd INTEGER,
   tmax INTEGER,
   tmin INTEGER,
);

CREATE TABLE time_slespsed (
   slespesd VARCHAR(64),
);

CREATE PROCEDURE time_slespsed
AS 
  SELECT *
  FROM time_slespsed;


-- Pasarle el año:
  -- year_trip = 2016 0 2017 ===> total trayectos anulados
CREATE PROCEDURE total_voided_trips
AS
  SELECT count(payment_type) AS total_voided_trips
  FROM (
    SELECT payment_type, year_trip FROM taxis2016 
    UNION ALL
    SELECT payment_type, year_trip FROM taxis2017 
  ) as total
  WHERE year_trip = ? AND payment_type = 6;


-- Pasarle el año:
  -- year_trip = 2016 0 2017 ===> total trayectos no cargados al cliente
CREATE PROCEDURE total_no_charge_trips
AS
   SELECT count(payment_type) AS total_no_charge_trips
   FROM (
      SELECT payment_type, year_trip FROM taxis2016 
      UNION ALL
      SELECT payment_type, year_trip FROM taxis2017 
   ) as total
   WHERE year_trip = ? AND payment_type = 3;


-- Pasarle el año:
  -- year_trip = 2016 0 2017 ; payment_type = 1 o 2 ===> total trayectos pagados con tarjeta crédito o efectivo
CREATE PROCEDURE total_payment_type_trips
AS
   SELECT count(payment_type) AS total_payment_type_trips
   FROM (
      SELECT payment_type, year_trip FROM taxis2016 
      UNION ALL
      SELECT payment_type, year_trip FROM taxis2017 
   ) as total
   WHERE year_trip = ? AND payment_type = ?;


-- Pasarle el año:
  -- year_trip = 2016 0 2017 ; ratecodeID = 1,5 o 6 ===> total trayectos con tarifas estándar,negociada o grupos
CREATE PROCEDURE total_rate_code_trips
AS
   SELECT count(ratecodeID) AS total_rate_code_trips
   FROM (
      SELECT ratecodeID, year_trip FROM taxis2016 
      UNION ALL
      SELECT ratecodeID, year_trip FROM taxis2017 
   ) as total
   WHERE year_trip = ? AND ratecodeID = ?;


-- Pasarle el año:
  -- year_trip = 2016 0 2017 ; vendorID = 1 o 2 ===> Creative Mobile Technologies o VeriFone que midió el trayecto
CREATE PROCEDURE total_passengers_vendorId
AS
   SELECT SUM(passenger_count) AS total_passengers_vendorId
   FROM (
      SELECT vendorID, passenger_count, year_trip FROM taxis2016 
      UNION ALL
      SELECT vendorID, passenger_count, year_trip FROM taxis2017 
   ) as total
   WHERE year_trip = ? AND vendorID = ?;


-- Pasarle el año:
  -- year_trip = 2016 0 2017 ===> Media de pasajeros que se montan en un taxi.
CREATE PROCEDURE average_passengers_taxi
AS
   SELECT AVG(passenger_count) AS average_passengers_taxi
   FROM (
      SELECT passenger_count, year_trip FROM taxis2016 
      UNION ALL
      SELECT passenger_count, year_trip FROM taxis2017 
   ) as total
   WHERE year_trip = ?;
