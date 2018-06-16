import org.voltdb.*;


public class get_info_2016 extends VoltProcedure {


	///todo//////////////////////////////////////////////////////////////////////////////////////

	public final SQLStmt get_trips = new SQLStmt(
		"SELECT top 10000 * FROM taxis2016 "
		+ "WHERE CONTAINS(polygonFromText(?), pointFromText('POINT('+ pickup_longitude + ' ' + pickup_latitude +')')) "
		+ "and CONTAINS(polygonFromText(?), pointFromText('POINT('+ dropoff_longitude + ' ' + dropoff_latitude +')')) "
		+ "ORDER BY TPEP_PICKUP_DATETIME asc;"
	);


	public final SQLStmt info_2016 = new SQLStmt(
		"SELECT max(total_amount) as max_amount, min(total_amount) as min_amount, "
		+ "max(trip_distance) as max_distance, min(trip_distance) as min_distance "
    	+ "FROM taxis2016 "
    	+ "WHERE CONTAINS(polygonFromText(?), pointFromText('POINT('+ pickup_longitude + ' ' + pickup_latitude +')')) "
		+ "and CONTAINS(polygonFromText(?), pointFromText('POINT('+ dropoff_longitude + ' ' + dropoff_latitude +')'));"
	);

    ////////////////////////////////////////////////////////////////////////////////


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

	public final SQLStmt max_distance_trip = new SQLStmt(
		"SELECT * "
    	+ "FROM taxis2016 "
    	+ "WHERE CONTAINS(polygonFromText(?), pointFromText('POINT('+ pickup_longitude + ' ' + pickup_latitude +')')) "
		+ "and CONTAINS(polygonFromText(?), pointFromText('POINT('+ dropoff_longitude + ' ' + dropoff_latitude +')')) "
    	+ "ORDER BY trip_distance "
    	+ "DESC LIMIT 1; "
	);

	public final SQLStmt min_distance_trip = new SQLStmt(
		"SELECT * "
    	+ "FROM taxis2016 "
    	+ "WHERE CONTAINS(polygonFromText(?), pointFromText('POINT('+ pickup_longitude + ' ' + pickup_latitude +')')) "
		+ "and CONTAINS(polygonFromText(?), pointFromText('POINT('+ dropoff_longitude + ' ' + dropoff_latitude +')')) "
    	+ "ORDER BY trip_distance "
    	+ "ASC LIMIT 1; "
	);
	
	/*option es el modo en el que se llamará al procedimiento:
		0 - todas las rutas y la info
		1 - most_expensive_trip
		2 - most_cheap_trip
		3 - max_distance_trip
		4 - min_distance_trip
	*/
	public VoltTable[] run(Byte option,
						   String polygon_PU,
						   String polygon_DO) 




		throws VoltAbortException {
			switch(option) { 
            	case 0:
               		voltQueueSQL(get_trips,polygon_PU,polygon_DO);
               		voltQueueSQL(info_2016,polygon_PU,polygon_DO);//este siempre estará, pero se repite, cambiarlo
               		break;
            	case 1:
            		voltQueueSQL(most_expensive_trip,polygon_PU,polygon_DO);
            		break;
            	case 2:
            		voltQueueSQL(most_cheap_trip,polygon_PU,polygon_DO);
            		break;
            	case 3:
            		voltQueueSQL(max_distance_trip,polygon_PU,polygon_DO);
            		break;
            	case 4:
            		voltQueueSQL(min_distance_trip,polygon_PU,polygon_DO);
   					break;
   			}
   			
   			return voltExecuteSQL();
		}
		
}

//exec get_info_2016  40.693103 40.673103 -73.934428 -73.964428;



    //podria hacer unos que muestren lo maximo o minimo solo cuando se filtren rutas, y si selecciono, quememuestrela ruta