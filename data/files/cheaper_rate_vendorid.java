import org.voltdb.*;

public class most_used_vendorID extends VoltProcedure {

   public final SQLStmt total_vendorID1 = new SQLStmt(
      "SELECT count(vendorID) AS total_vendorID1 FROM taxis2016 "
      + "WHERE vendorID = 1;"
   );

   public final SQLStmt total_vendorID2 = new SQLStmt(
      "SELECT count(vendorID) AS total_vendorID2 FROM taxis2016 "
      + "WHERE vendorID = 2;"
   );

   public final SQLStmt get_vendorID1 = new SQLStmt(
      "SELECT DISTINCT vendorID AS most_used_vendorID FROM taxis2016 "
      + "WHERE vendorID = 1;"
   );

   public final SQLStmt get_vendorID2 = new SQLStmt(
      "SELECT DISTINCT vendorID AS most_used_vendorID FROM taxis2016 "
      + "WHERE vendorID = 2;"
   );

   public long get_total_vendorID(VoltTable result) {
         long vendorID = 0;
         result.resetRowPosition();
         while (result.advanceRow()) {
            vendorID = result.getLong(0);
         }

         return vendorID;
   }

	public VoltTable[] run() 

		throws VoltAbortException {

			voltQueueSQL(total_vendorID1);
         voltQueueSQL(total_vendorID2);
 			VoltTable[] results = voltExecuteSQL();
 			VoltTable result1 = results[0];
         VoltTable result2 = results[1];

         long vendorID1 = get_total_vendorID(result1);
         System.out.printf("%d\n", vendorID1);

         long vendorID2 = get_total_vendorID(result2);
         System.out.printf("%d\n", vendorID2);

         voltQueueSQL(total_vendorID1);
         voltQueueSQL(total_vendorID2);

         if (vendorID1 > vendorID2){
            voltQueueSQL(get_vendorID1);
         } else {
            voltQueueSQL(get_vendorID2);
         }

       	return voltExecuteSQL();
		}

}
