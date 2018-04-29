
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




--numero de rutas por localizacón de inicio de ruta (ejemplo)
--Ejecución -->  > exec numtrips_PU 4;
CREATE PROCEDURE numtrips_PU
  PARTITION ON TABLE taxis2017 COLUMN PULocationId
  AS 
    select 
      count(1) 
    from taxis2017 a
    left join location b
    on
      a.PULocationId = b.location_Id
    where 
      b.location_Id = ?
;


--procedimiento de ayuda para el anterior ejemplo, pasandole el id me dice todo
--ejecución-->   > exec Boroughs_name 4;
CREATE PROCEDURE boroughs_name --nombre del distrito
  AS 
    select   
      *
    from location 
    where location_Id = ?
;


--procedimiento simple con java
CREATE PROCEDURE
	FROM CLASS get_id_location_zone;


CREATE PROCEDURE
  FROM CLASS max_distance_trips2017;