import org.voltdb.*;

public class store_procedures extends VoltProcedure {

	public final SQLStmt get_id = new SQLStmt(
		"select location_Id from location " +
		"where zone = ?;"
	);


	//le paso un string con el el nombre de la zona ("Central Park" por ejemplo)
	public VoltTable[] run(String zona) 


		throws VoltAbortException {

			voltQueueSQL(get_id,zona);
          	return voltExecuteSQL();
		}

}
