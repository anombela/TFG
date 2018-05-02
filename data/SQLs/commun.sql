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

--drop procedure total_voided_trips;
--se le pasará como parámetro el año
CREATE PROCEDURE total_voided_trips
AS
	SELECT count(payment_type) AS total_voided_trips
	FROM (
		SELECT payment_type, year_trip FROM taxis2016 
		UNION ALL
		SELECT payment_type, year_trip FROM taxis2017 
	) as total
	WHERE year_trip = ? AND payment_type = 6;