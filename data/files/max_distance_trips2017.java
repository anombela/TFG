import org.voltdb.*;

public class max_distance_trips2017 extends VoltProcedure {

	public final SQLStmt get_trip = new SQLStmt(
		"SELECT trip_distance, PULocationID, DOLocationID FROM taxis2017 "
		+ "ORDER BY trip_distance DESC LIMIT 1;"
	);

	public final SQLStmt get_origin_zone = new SQLStmt(
		"SELECT * FROM location WHERE location_id = ?;"
	);

	public VoltTable[] run() 

		throws VoltAbortException {

			voltQueueSQL(get_trip);
 			VoltTable[] results = voltExecuteSQL();

 	
 			System.out.println(results[0]);
 			System.out.println(results[0].toFormattedString());
 			System.out.println(results[0].getColumnCount());
 			System.out.println(results[0].getColumnName(1));
 			System.out.println(results[0].getRowCount());
 			//System.out.println(results[0].fetchRow(1));

          	return voltExecuteSQL();
		}

}