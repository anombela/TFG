import org.voltdb.*;


public class get_info_2016 extends VoltProcedure {

	public final SQLStmt get_trips = new SQLStmt(
		"SELECT  count(1) as Num_Trips FROM taxis2016 "
		+ "WHERE CONTAINS(polygonFromText(?), pointFromText('POINT('+ pickup_longitude + ' ' + pickup_latitude +')'));"
		//+ "ORDER BY trip_distance DESC LIMIT 1;"
	);

	public VoltTable[] run(double north_PU,
        				   double south_PU,
        				   double east_PU,
        				   double west_PU) 

		throws VoltAbortException {


			//System.out.println(north_PU + "  |  " +south_PU+ "  |  " +east_PU+"  |  " +west_PU);
			//punto 1 del rectangulo arriba a la derecha, el resto en estido horario
			//van primero longitud y luego latitud (horizontal- vertical)
			String P1 =  String.valueOf(east_PU) + " " +String.valueOf(north_PU);
        	String P2 =	 String.valueOf(west_PU) + " " +String.valueOf(north_PU);
        	String P3 =  String.valueOf(west_PU) + " " +String.valueOf(south_PU);
        	String P4 =	 String.valueOf(east_PU) + " " +String.valueOf(south_PU);

			//polygonFromText('POLYGON((-64.72 32.16, -80.41 25.30, -65.82 18.40, -64.72 32.16))')
			String rectangle = "POLYGON(("+P1+", "+P2+", "+P3+", "+P4+", "+P1+"))";
			System.out.println(rectangle);
			voltQueueSQL(get_trips,rectangle);
          	return voltExecuteSQL();
		}

}

//exec get_info_2016  40.693103 40.673103 -73.934428 -73.964428;

