import org.voltdb.*;

public class cheaper_rate_vendorID extends VoltProcedure {

   public final SQLStmt mean_total_amount_vendorID1 = new SQLStmt(
      "SELECT DISTINCT vendorID AS vendorID1, avg(total_amount) AS mean_total_amount_trip FROM taxis2016 "
      + "WHERE vendorID = 1 GROUP BY vendorID;"
   );


   public final SQLStmt mean_total_amount_vendorID2 = new SQLStmt(
      "SELECT DISTINCT vendorID AS vendorID2, avg(total_amount) AS mean_total_amount_trip FROM taxis2016 "
      + "WHERE vendorID = 2 GROUP BY vendorID;"
   );

   public final SQLStmt cheaper_rate_vendorID1 = new SQLStmt(
      "SELECT DISTINCT vendorID AS cheaper_rate_vendorID1, avg(total_amount) AS mean_total_amount_trip FROM taxis2016 "
      + "WHERE vendorID = 1 GROUP BY vendorID;"
   );

   public final SQLStmt cheaper_rate_vendorID2 = new SQLStmt(
      "SELECT DISTINCT vendorID AS cheaper_rate_vendorID2, avg(total_amount) AS mean_total_amount_trip FROM taxis2016 "
      + "WHERE vendorID = 2 GROUP BY vendorID;"
   );

   public long mean_total_amount_trip(VoltTable result) {
         final int colCount = result.getColumnCount();
         long mean = 0;
         result.resetRowPosition();
         while (result.advanceRow()) {
            for (int col=0; col<colCount; col++) {
                  if (col == 1){
                     mean = result.getLong(col);
                     System.out.printf("%d\n", mean);
                  }
            }
         }

         return mean;
   }

   public VoltTable[] run() 

      throws VoltAbortException {

         voltQueueSQL(mean_total_amount_vendorID1);
         voltQueueSQL(mean_total_amount_vendorID2);
         VoltTable[] results = voltExecuteSQL();
         VoltTable result1 = results[0];
         VoltTable result2 = results[1];

         long mean1 = mean_total_amount_trip(result1);
         System.out.printf("%d\n", mean1);

         long mean2 = mean_total_amount_trip(result2);
         System.out.printf("%d\n", mean2);

         voltQueueSQL(mean_total_amount_vendorID1);
         voltQueueSQL(mean_total_amount_vendorID2);

         if (mean1 < mean2){
            voltQueueSQL(cheaper_rate_vendorID1);
         } else {
            voltQueueSQL(cheaper_rate_vendorID2);
         }

         return voltExecuteSQL();
      }

}