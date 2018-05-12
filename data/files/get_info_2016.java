import org.voltdb.*;


public class get_info_2016 extends VoltProcedure {

	public final SQLStmt get_trips = new SQLStmt(
		"SELECT  * as Num_Trips FROM taxis2016 "
		+ "WHERE CONTAINS(polygonFromText(?), pointFromText('POINT('+ pickup_longitude + ' ' + pickup_latitude +')')) "
		+ "and CONTAINS(polygonFromText(?), pointFromText('POINT('+ dropoff_longitude + ' ' + dropoff_latitude +')'));"
	);

	public VoltTable[] run(String polygon_PU,
						   String polygon_DO) 

		throws VoltAbortException {

			voltQueueSQL(get_trips,polygon_PU,polygon_DO);
          	return voltExecuteSQL();
		}

}

//exec get_info_2016  40.693103 40.673103 -73.934428 -73.964428;

