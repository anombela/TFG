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

CREATE PROCEDURE total_voided_trips

DECLARE @table VARCHAR(64)  
SET @table = ?
IF @table == "taxis2017"
   SELECT count(payment_type) AS total_voided_trips
   FROM taxis2017
   WHERE payment_type = 6;

--CREATE PROCEDURE total_voided_trips
--  AS 
--    SELECT count(payment_type) AS total_voided_trips
--    FROM ?
--    WHERE payment_type = 6;