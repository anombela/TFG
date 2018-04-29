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


CREATE PROCEDURE
  FROM CLASS max_distance_trips2016;

CREATE PROCEDURE
  FROM CLASS min_distance_trips2016;