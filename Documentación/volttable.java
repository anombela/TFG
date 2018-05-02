import org.voltdb.*;

public class max_distance_trips2017 extends VoltProcedure {

	public final SQLStmt get_trip = new SQLStmt(
		"SELECT trip_distance, PULocationID, DOLocationID FROM taxis2017 "
		+ "ORDER BY trip_distance DESC LIMIT 2;"
	);

	/*public final SQLStmt get_origin_zone = new SQLStmt(
		"SELECT * FROM location WHERE location_id = ?;"
	);*/

	public VoltTable[] run() 

		throws VoltAbortException {

			voltQueueSQL(get_trip);
 			VoltTable[] results = voltExecuteSQL(); //aquí se obtiene el resultado detodaslas consultas
 			VoltTable result = results[0];//cojo el resultado  de la primera consulta

 			
 			final int colCount = result.getColumnCount(); //obtiene el número de columnas que hay
 			int rowCount = 1;
 			result.resetRowPosition(); //esto para comenzar desde la primera fila, importante
 			while (result.advanceRow()) { //va avanzando cada fila
      			System.out.printf("--- Row %d ---\n",rowCount++);

      			for (int col=0; col<colCount; col++) {
         			System.out.printf("%s: ",result.getColumnName(col));b//pintta el nombre de la columna
         			switch(result.getColumnType(col)) { //dependiendo del tipo que sea la columna se pinta de una forma u otra
            			case TINYINT: case SMALLINT: case BIGINT: case INTEGER:
               				System.out.printf("%d\n", result.getLong(col));
               				break;
            			case STRING:
               				System.out.printf("%s\n", result.getString(col));
               				break;
            			case DECIMAL:
               				System.out.printf("%f\n", result.getDecimalAsBigDecimal(col));
               				break;
            			case FLOAT:
               				System.out.printf("%f\n", result.getDouble(col));
               				break;
         			}
      			}
   			}
   			

          	return voltExecuteSQL();
		}

}
