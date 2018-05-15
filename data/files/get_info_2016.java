import org.voltdb.*;


public class get_info_2016 extends VoltProcedure {

	public final SQLStmt get_trips = new SQLStmt(
		"SELECT  * FROM taxis2016 "
		+ "WHERE CONTAINS(polygonFromText(?), pointFromText('POINT('+ pickup_longitude + ' ' + pickup_latitude +')')) "
		+ "and CONTAINS(polygonFromText(?), pointFromText('POINT('+ dropoff_longitude + ' ' + dropoff_latitude +')')) "
		+ "ORDER BY TPEP_PICKUP_DATETIME asc;"
	);


	public final SQLStmt most_expensive_trip = new SQLStmt(
		"SELECT * "
    	+ "FROM taxis2016 "
    	+ "WHERE CONTAINS(polygonFromText(?), pointFromText('POINT('+ pickup_longitude + ' ' + pickup_latitude +')')) "
		+ "and CONTAINS(polygonFromText(?), pointFromText('POINT('+ dropoff_longitude + ' ' + dropoff_latitude +')')) "
    	+ "ORDER BY total_amount DESC "
    	+ "LIMIT 1;"
	);

	public final SQLStmt most_cheap_trip = new SQLStmt(
		"SELECT * "
    	+ "FROM taxis2016 "
    	+ "WHERE CONTAINS(polygonFromText(?), pointFromText('POINT('+ pickup_longitude + ' ' + pickup_latitude +')')) "
		+ "and CONTAINS(polygonFromText(?), pointFromText('POINT('+ dropoff_longitude + ' ' + dropoff_latitude +')')) "
    	+ "ORDER BY total_amount ASC "
    	+ "LIMIT 1;"
	);

	public final SQLStmt max_distance = new SQLStmt(
		"SELECT * "
    	+ "FROM taxis2016 "
    	+ "WHERE CONTAINS(polygonFromText(?), pointFromText('POINT('+ pickup_longitude + ' ' + pickup_latitude +')')) "
		+ "and CONTAINS(polygonFromText(?), pointFromText('POINT('+ dropoff_longitude + ' ' + dropoff_latitude +')')) "
    	+ "ORDER BY trip_distance "
    	+ "DESC LIMIT 1; "
	);

	public final SQLStmt min_distance = new SQLStmt(
		"SELECT * "
    	+ "FROM taxis2016 "
    	+ "WHERE CONTAINS(polygonFromText(?), pointFromText('POINT('+ pickup_longitude + ' ' + pickup_latitude +')')) "
		+ "and CONTAINS(polygonFromText(?), pointFromText('POINT('+ dropoff_longitude + ' ' + dropoff_latitude +')')) "
    	+ "ORDER BY trip_distance "
    	+ "ASC LIMIT 1; "
	);
	

	public VoltTable[] run(String polygon_PU,
						   String polygon_DO) 

		throws VoltAbortException {

			voltQueueSQL(get_trips,polygon_PU,polygon_DO);
			voltQueueSQL(most_expensive_trip,polygon_PU,polygon_DO);
			voltQueueSQL(most_cheap_trip,polygon_PU,polygon_DO);
			voltQueueSQL(max_distance,polygon_PU,polygon_DO);
			voltQueueSQL(min_distance,polygon_PU,polygon_DO);
          	return voltExecuteSQL();
		}

}

//exec get_info_2016  40.693103 40.673103 -73.934428 -73.964428;



    //podria hacer unos que muestren lo maximo o minimo solo cuando se filtren rutas, y si selecciono, quememuestrela ruta