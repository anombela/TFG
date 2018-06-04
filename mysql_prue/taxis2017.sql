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


