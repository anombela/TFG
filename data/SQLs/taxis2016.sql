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

CREATE PROCEDURE max_distance_trips2016
  AS 
    SELECT trip_distance, pickup_longitude, pickup_latitude, dropoff_longitude, dropoff_latitude
    FROM taxis2016
    ORDER BY trip_distance
    DESC LIMIT 1;

CREATE PROCEDURE min_distance_trips2016
  AS 
    SELECT trip_distance, pickup_longitude, pickup_latitude, dropoff_longitude, dropoff_latitude
    FROM taxis2016
    ORDER BY trip_distance
    ASC LIMIT 1;

CREATE PROCEDURE
  FROM CLASS most_used_vendorID;

CREATE PROCEDURE
  FROM CLASS cheaper_rate_vendorID;

CREATE PROCEDURE
  FROM CLASS  get_info_2016;


