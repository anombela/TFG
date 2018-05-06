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
 			VoltTable result = results[0];

 			
 			final int colCount = result.getColumnCount();
 			long PULocationID = 0;
 			long DOLocationID = 0;
 			result.resetRowPosition();
 			while (result.advanceRow()) {
   			for (int col=0; col<colCount; col++) {
            		if (col == 1){
      					PULocationID = result.getLong(col);
      					System.out.printf("%d\n", PULocationID);
   				   }
            		else if (col == 2) {
            			DOLocationID = result.getLong(col);
            			System.out.printf("%d\n", DOLocationID);
            		}
   			}
   		}

   			voltQueueSQL(get_trip);
   			voltQueueSQL(get_origin_zone, PULocationID);
   			voltQueueSQL(get_origin_zone, DOLocationID);
          	return voltExecuteSQL();
		}

}
