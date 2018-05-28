CREATE TABLE taxis2017 (
   vendorID INTEGER,
   tpep_pickup_datetime VARCHAR(64),
   tpep_dropoff_datetime VARCHAR(64),
   passenger_count INTEGER,
   trip_distance DECIMAL,
   ratecodeID INTEGER,
   store_and_fwd_flag VARCHAR(1),
   PULocationID INTEGER NOT NULL,
   DOLocationID INTEGER NOT NULL,
   payment_type INTEGER,
   fare_amount DECIMAL,
   extra DECIMAL,
   mta_tax DECIMAL,
   tip_amount DECIMAL,
   tolls_amount DECIMAL,
   improvement_surcharge DECIMAL,
   total_amount DECIMAL
);


CREATE INDEX y_tripdata_idx ON taxis2017 (PULocationId, DOLocationId);


PARTITION TABLE taxis2017 ON COLUMN PULocationId;

CREATE TABLE location(
  location_Id INTEGER NOT NULL primary key,
  borough VARCHAR(64),
  zone VARCHAR(64),
  service_Zone VARCHAR(64),
  ntacode VARCHAR(64)
);


CREATE PROCEDURE
  FROM CLASS journey_max_total_amount_trips2017;

CREATE PROCEDURE
  FROM CLASS journey_min_total_amount_trips2017;

CREATE PROCEDURE
  FROM CLASS max_distance_trips2017;

CREATE PROCEDURE
  FROM CLASS min_distance_trips2017;

CREATE PROCEDURE
  FROM CLASS  get_info_2017;
