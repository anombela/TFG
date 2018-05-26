function Max_Trip2017(datos){

    var destino1 = datos.results[1].data[0][2];
    var destino2 = datos.results[2].data[0][2];

    calculaRutaName(destino1,destino2);

}

function load_max_trips2017(){
    var url = "http://localhost:8080/api/1.0/?Procedure=max_distance_trips2017";
    callJSON(url,"Max_Trip2017");
    callJSON(url,"Print_Table");
}

function Max_total_amount_Trip2017(datos){

    var destino1 = datos.results[1].data[0][2];
    var destino2 = datos.results[2].data[0][2];

    calculaRutaName(destino1,destino2);

}

function load_max_total_amount_trips2017(){
    var url = "http://localhost:8080/api/1.0/?Procedure=journey_max_total_amount_trips2017";
    callJSON(url,"Max_total_amount_Trip2017");
    callJSON(url,"Print_Table");
}

function Min_total_amount_Trip2017(datos){

    var destino1 = datos.results[1].data[0][2];
    var destino2 = datos.results[2].data[0][2];

    calculaRutaName(destino1,destino2);

}

function load_min_total_amount_trips2017(){
    var url = "http://localhost:8080/api/1.0/?Procedure=journey_min_total_amount_trips2017";
    callJSON(url,"Min_total_amount_Trip2017");
    callJSON(url,"Print_Table");
}

function total_voided_trips_2017(){
    var year = "2017"
    var url = "http://localhost:8080/api/1.0/?Procedure=total_voided_trips&Parameters=" + 
              "['" +  year + "']";
    callJSON(url,"Print_Table");
}

function total_no_charge_trips_2017(){
    var year = "2017"
    var url = "http://localhost:8080/api/1.0/?Procedure=total_no_charge_trips&Parameters=" + 
              "['" +  year + "']";
    callJSON(url,"Print_Table");
}

function total_payment_credit_trips_2017(){
    var year = "2017"
    var pay = "1"
    var url = "http://localhost:8080/api/1.0/?Procedure=total_payment_type_trips&Parameters=" + 
              "['" +  year + "','" + pay + "']";
    callJSON(url,"Print_Table");
}

function total_payment_efective_trips_2017(){
    var year = "2017"
    var pay = "2"
    var url = "http://localhost:8080/api/1.0/?Procedure=total_payment_type_trips&Parameters=" + 
              "['" +  year + "','" + pay + "']";
    callJSON(url,"Print_Table");
}

function total_rate_standar_trips_2017(){
    var year = "2017"
    var tarifa = "1"
    var url = "http://localhost:8080/api/1.0/?Procedure=total_rate_code_trips&Parameters=" + 
              "['" +  year + "','" + tarifa + "']";
    callJSON(url,"Print_Table");
}

function total_rate_negociate_trips_2017(){
    var year = "2017"
    var tarifa = "5"
    var url = "http://localhost:8080/api/1.0/?Procedure=total_rate_code_trips&Parameters=" + 
              "['" +  year + "','" + tarifa + "']";
    callJSON(url,"Print_Table");
}

function total_rate_group_trips_2017(){
    var year = "2017"
    var tarifa = "6"
    var url = "http://localhost:8080/api/1.0/?Procedure=total_rate_code_trips&Parameters=" + 
              "['" +  year + "','" + tarifa + "']";
    callJSON(url,"Print_Table");
}

function total_passengers_vendorId1_2017(){
    var year = "2017"
    var vendorID = "1"
    var url = "http://localhost:8080/api/1.0/?Procedure=total_passengers_vendorId&Parameters=" + 
              "['" +  year + "','" + vendorID + "']";
    callJSON(url,"Print_Table");
}

function total_passengers_vendorId2_2017(){
    var year = "2017"
    var vendorID = "2"
    var url = "http://localhost:8080/api/1.0/?Procedure=total_passengers_vendorId&Parameters=" + 
              "['" +  year + "','" + vendorID + "']";
    callJSON(url,"Print_Table");
}

function average_passengers_taxi_2017(){
    var year = "2017"
    var url = "http://localhost:8080/api/1.0/?Procedure=average_passengers_taxi&Parameters=" + 
              "['" +  year + "']";
    callJSON(url,"Print_Table");
}