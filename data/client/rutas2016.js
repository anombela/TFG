function Max_Trip2016(datos){

    var destino1 = parseFloat(datos.results[0].data[0][2]);
    var destino2 = parseFloat(datos.results[0].data[0][1]);
    var destino3 = parseFloat(datos.results[0].data[0][4]);
    var destino4 = parseFloat(datos.results[0].data[0][3]);

    calculaRutaCoords(destino1,destino2,destino3,destino4);

}

function load_max_trips2016(){
    var url = "http://localhost:8080/api/1.0/?Procedure=max_distance_trips2016";
    callJSON(url,"Max_Trip2016");
    callJSON(url,"Print_Table");
}


function Max_total_amount_Trip2016(datos){

    var destino1 = parseFloat(datos.results[0].data[0][2]);
    var destino2 = parseFloat(datos.results[0].data[0][1]);
    var destino3 = parseFloat(datos.results[0].data[0][4]);
    var destino4 = parseFloat(datos.results[0].data[0][3]);

    calculaRutaCoords(destino1,destino2,destino3,destino4);

}

function load_max_total_amount_trips2016(){
    var url = "http://localhost:8080/api/1.0/?Procedure=journey_max_total_amount_trips2016";
    callJSON(url,"Max_total_amount_Trip2016");
    callJSON(url,"Print_Table");
}

function Min_total_amount_Trip2016(datos){

    var destino1 = parseFloat(datos.results[0].data[0][2]);
    var destino2 = parseFloat(datos.results[0].data[0][1]);
    var destino3 = parseFloat(datos.results[0].data[0][4]);
    var destino4 = parseFloat(datos.results[0].data[0][3]);

    calculaRutaCoords(destino1,destino2,destino3,destino4);

}

function load_min_total_amount_trips2016(){
    var url = "http://localhost:8080/api/1.0/?Procedure=journey_min_total_amount_trips2016";
    callJSON(url,"Min_total_amount_Trip2016");
    callJSON(url,"Print_Table");
}


function total_voided_trips_2016(){
    var year = "2016"
    var url = "http://localhost:8080/api/1.0/?Procedure=total_voided_trips&Parameters=" + 
              "['" +  year + "']";
    callJSON(url,"Print_Table");
}

function total_no_charge_trips_2016(){
    var year = "2016"
    var url = "http://localhost:8080/api/1.0/?Procedure=total_no_charge_trips&Parameters=" + 
              "['" +  year + "']";
    callJSON(url,"Print_Table");
}

function total_payment_credit_trips_2016(){
    var year = "2016"
    var pay = "1"
    var url = "http://localhost:8080/api/1.0/?Procedure=total_payment_type_trips&Parameters=" + 
              "['" +  year + "','" + pay + "']";
    callJSON(url,"Print_Table");
}

function total_payment_efective_trips_2016(){
    var year = "2016"
    var pay = "2"
    var url = "http://localhost:8080/api/1.0/?Procedure=total_payment_type_trips&Parameters=" + 
              "['" +  year + "','" + pay + "']";
    callJSON(url,"Print_Table");
}

function total_rate_standar_trips_2016(){
    var year = "2016"
    var tarifa = "1"
    var url = "http://localhost:8080/api/1.0/?Procedure=total_rate_code_trips&Parameters=" + 
              "['" +  year + "','" + tarifa + "']";
    callJSON(url,"Print_Table");
}

function total_rate_negociate_trips_2016(){
    var year = "2016"
    var tarifa = "5"
    var url = "http://localhost:8080/api/1.0/?Procedure=total_rate_code_trips&Parameters=" + 
              "['" +  year + "','" + tarifa + "']";
    callJSON(url,"Print_Table");
}

function total_rate_group_trips_2016(){
    var year = "2016"
    var tarifa = "6"
    var url = "http://localhost:8080/api/1.0/?Procedure=total_rate_code_trips&Parameters=" + 
              "['" +  year + "','" + tarifa + "']";
    callJSON(url,"Print_Table");
}

function total_passengers_vendorId1_2016(){
    var year = "2016"
    var vendorID = "1"
    var url = "http://localhost:8080/api/1.0/?Procedure=total_passengers_vendorId&Parameters=" + 
              "['" +  year + "','" + vendorID + "']";
    callJSON(url,"Print_Table");
}

function total_passengers_vendorId2_2016(){
    var year = "2016"
    var vendorID = "2"
    var url = "http://localhost:8080/api/1.0/?Procedure=total_passengers_vendorId&Parameters=" + 
              "['" +  year + "','" + vendorID + "']";
    callJSON(url,"Print_Table");
}

function average_passengers_taxi_2016(){
    var year = "2016"
    var url = "http://localhost:8080/api/1.0/?Procedure=average_passengers_taxi&Parameters=" + 
              "['" +  year + "']";
    callJSON(url,"Print_Table");
}

