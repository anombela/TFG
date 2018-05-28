import org.voltdb.*;


public class get_info_2017 extends VoltProcedure {

	public final SQLStmt get_options = new SQLStmt(
		"SELECT  distinct BOROUGH FROM Location "
		+ "ORDER BY BOROUGH asc;"
	);
	
	///todo//////////////////////////////////////////////////////////////////////////////////////

	public final SQLStmt get_trips_2017 = new SQLStmt(
		"SELECT b.BOROUGH as SUBIDA,c.BOROUGH as BAJADA,a.* FROM taxis2017 a "
		+ "left join Location b "
		+ "on a.PULocationID = b.location_Id "
		+ "left join Location c "
		+ "on a.DOLocationID = c.location_Id "
		+ "WHERE b.BOROUGH = ? and c.BOROUGH = ? "
		+ "ORDER BY b.BOROUGH,c.BOROUGH,TPEP_PICKUP_DATETIME asc;"
	);
	public final SQLStmt get_trips_2017_all = new SQLStmt(
		"SELECT b.BOROUGH as SUBIDA,c.BOROUGH as BAJADA,a.* FROM taxis2017 a "
		+ "left join Location b "
		+ "on a.PULocationID = b.location_Id "
		+ "left join Location c "
		+ "on a.DOLocationID = c.location_Id "
		+ "ORDER BY b.BOROUGH,c.BOROUGH,TPEP_PICKUP_DATETIME asc;"
	);


	public final SQLStmt info_2017 = new SQLStmt(
		"SELECT max(total_amount) as max_amount, min(total_amount) as min_amount, "
		+ "max(trip_distance) as max_distance, min(trip_distance) as min_distance "
    	+ "FROM taxis2017 a "
		+ "left join Location b "
		+ "on a.PULocationID = b.location_Id "
		+ "left join Location c "
		+ "on a.DOLocationID = c.location_Id "
		+ "WHERE b.BOROUGH = ? and c.BOROUGH = ? "
		+ "ORDER BY b.BOROUGH,c.BOROUGH,TPEP_PICKUP_DATETIME asc;"
	);
	public final SQLStmt info_2017_all = new SQLStmt(
		"SELECT max(total_amount) as max_amount, min(total_amount) as min_amount, "
		+ "max(trip_distance) as max_distance, min(trip_distance) as min_distance "
    	+ "FROM taxis2017 a "
		+ "left join Location b "
		+ "on a.PULocationID = b.location_Id "
		+ "left join Location c "
		+ "on a.DOLocationID = c.location_Id "
		+ "ORDER BY b.BOROUGH,c.BOROUGH,TPEP_PICKUP_DATETIME asc;"
	);


    ////////////////////////////////////////////////////////////////////////////////


	public final SQLStmt most_expensive_trip_2017 = new SQLStmt(
		"SELECT b.BOROUGH as SUBIDA,c.BOROUGH as BAJADA,a.* "
    	+ "FROM taxis2017  a "
    	+ "left join Location b "
		+ "on a.PULocationID = b.location_Id "
		+ "left join Location c "
		+ "on a.DOLocationID = c.location_Id "
		+ "WHERE b.BOROUGH = ? and c.BOROUGH = ? "
		+ "ORDER BY total_amount DESC "
    	+ "LIMIT 1;"
    	


    	
	);

	public final SQLStmt most_cheap_trip_2017 = new SQLStmt(
		"SELECT b.BOROUGH as SUBIDA,c.BOROUGH as BAJADA,a.* "
    	+ "FROM taxis2017  a "
    	+ "left join Location b "
		+ "on a.PULocationID = b.location_Id "
		+ "left join Location c "
		+ "on a.DOLocationID = c.location_Id "
		+ "WHERE b.BOROUGH = ? and c.BOROUGH = ? "
    	+ "ORDER BY total_amount ASC "
    	+ "LIMIT 1;"
	);

	public final SQLStmt max_distance_trip_2017 = new SQLStmt(
		"SELECT b.BOROUGH as SUBIDA,c.BOROUGH as BAJADA,a.* "
    	+ "FROM taxis2017  a "
    	+ "left join Location b "
		+ "on a.PULocationID = b.location_Id "
		+ "left join Location c "
		+ "on a.DOLocationID = c.location_Id "
		+ "WHERE b.BOROUGH = ? and c.BOROUGH = ? "
    	+ "ORDER BY trip_distance DESC "
    	+ "LIMIT 1; "
	);

	public final SQLStmt min_distance_trip_2017 = new SQLStmt(
		"SELECT b.BOROUGH as SUBIDA,c.BOROUGH as BAJADA,a.* "
    	+ "FROM taxis2017  a "
    	+ "left join Location b "
		+ "on a.PULocationID = b.location_Id "
		+ "left join Location c "
		+ "on a.DOLocationID = c.location_Id "
		+ "WHERE b.BOROUGH = ? and c.BOROUGH = ? "
    	+ "ORDER BY trip_distance ASC "
    	+ "LIMIT 1; "
	);


	/*option es el modo en el que se llamará al procedimiento:
	   -1 - para conseguir lainfo parapoderseleecionar
		0 - todas las rutas y la info
		1 - most_expensive_trip
		2 - most_cheap_trip
		3 - max_distance_trip
		4 - min_distance_trip
	*/
	public VoltTable[] run(Byte option,
						   String zone_PU,
						   String zone_DO) 





		throws VoltAbortException {

			switch(option) { 
            	case -1:
               		voltQueueSQL(get_options);
               		break;
               	case 5:
               		voltQueueSQL(get_trips_2017_all);
               		voltQueueSQL(info_2017_all);
               		break;
               	case 0:
               		voltQueueSQL(get_trips_2017,zone_PU,zone_DO);
               		voltQueueSQL(info_2017,zone_PU,zone_DO);
               		break;
               	case 1:
            		voltQueueSQL(most_expensive_trip_2017,zone_PU,zone_DO);
            		break;
            	case 2:
            		voltQueueSQL(most_cheap_trip_2017,zone_PU,zone_DO);
            		break;
            	case 3:
            		voltQueueSQL(max_distance_trip_2017,zone_PU,zone_DO);
            		break;
            	case 4:
            		voltQueueSQL(min_distance_trip_2017,zone_PU,zone_DO);
   					break;
            
   			}

   			return voltExecuteSQL();
		}
		
}
