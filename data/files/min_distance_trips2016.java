import org.voltdb.*;

public class min_distance_trips2016 extends VoltProcedure {

	public final SQLStmt get_trip = new SQLStmt(
		"SELECT trip_distance, pickup_longitude, pickup_latitude, dropoff_longitude, dropoff_latitude FROM taxis2016 "
		+ "ORDER BY trip_distance ASC LIMIT 1;"
	);

	public VoltTable[] run() 

		throws VoltAbortException {

			voltQueueSQL(get_trip);
          	return voltExecuteSQL();
		}

}