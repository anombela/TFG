CREATE TABLE taxis (
   VendorID INTEGER,
   tpep_pickup_datetime VARCHAR(64),
   tpep_dropoff_datetime VARCHAR(64),
   passenger_count INTEGER,
   trip_distance FLOAT,
   RatecodeID INTEGER,
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

--CREATE INDEX y_tripdata_idx ON taxis (PULocationId, DOLocationId);


PARTITION TABLE taxis ON COLUMN PULocationId;

CREATE TABLE Location(
  Location_Id Integer NOT NULL primary key,
  Borough varchar(64),
  Zone varchar(64),
  Service_Zone varchar(64),
  ntacode varchar(64)
);




--numero de rutas por localizacón de inicio de ruta (ejemplo)
--Ejecución -->  > exec numtrips_PU 4;
CREATE PROCEDURE numtrips_PU
  PARTITION ON TABLE taxis COLUMN PULocationId
  AS 
    select 
      count(1) 
    from taxis a
    left join Location b
    on
      a.PULocationId = b.Location_Id
    where 
      b.Location_Id = ?
;


--procedimiento de ayuda para el anterior ejemplo, pasandole el id me dice todo
--ejecución-->   > exec Boroughs_name 4;
CREATE PROCEDURE Boroughs_name --nombre del distrito
  AS 
    select   
      *
    from Location 
    where Location_Id = ?
;


--procedimiento simple con java
CREATE PROCEDURE
	--PARTITION ON TABLE yellow_tripdata COLUMN zona para este simple demomento no vale esto
	FROM CLASS store_procedures;
