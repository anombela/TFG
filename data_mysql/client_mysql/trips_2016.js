function getRectangle_PU(){
    var bounds = {
        north: 40.713103,
        south: 40.693103,
        east: -73.934428,
        west: -73.964428
    }; 
    var rectangle = new google.maps.Rectangle({
        //map: map,  //si se pone aquí luego abajo no hace falta
        bounds: bounds,
        strokeColor: 'red',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: 'red',
        fillOpacity: 0.35,
        draggable: true,
        geodesic: true,
        editable: true // de momento no
    });
    map.setCenter({lat: 40.7142700, lng: -74.0059700});
    map.setZoom(10);
    
    if (rectangles[0] != "Rectangle_PU"){
        rectangles[0].setMap(null);
    }
    rectangles[0] = rectangle
    rectangle.setMap(map);
    rectangle.addListener('bounds_changed', function(){
    	clearTimeout(mapupdater);
     	mapupdater=setTimeout(move_PU,500); 
     	//pequeño retraso de medio segundo, porque si no se llamaba a la funcíón muchas veces y colapsaba
    });


   
}
//el rectangulo seobtine con los puntos de abajo izquierda y arriba derecha, los otros se calcularán
function getRectangle_DO(){ 
    var bounds = {
        north: 40.693103,
        south: 40.673103,
        east: -73.934428,
        west: -73.964428
    };
    var rectangle = new google.maps.Rectangle({
        //map: map,
        bounds: bounds,
        strokeColor: 'blue',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: 'blue',
        fillOpacity: 0.35,
        draggable: true,
        geodesic: true,
        editable: true // de momento no

    });
    map.setCenter({lat: 40.7142700, lng: -74.0059700});
     map.setZoom(10);
    if (rectangles[1] != "Rectangle_DO"){
        rectangles[1].setMap(null);
    }
    rectangles[1] = rectangle
    rectangle.setMap(map);
    rectangle.addListener('bounds_changed', function(){
    	clearTimeout(mapupdater);
     	mapupdater=setTimeout(move_DO,500); 
     	//pequeño retraso de medio segundo, porque si no se llamaba a la funcíón muchas veces y colapsaba
    });


}



//estos dosson iguales,habría que optimizar para no repetir código
function move_PU(data){

    var ne = rectangles[0].getBounds().getNorthEast();
    var sw = rectangles[0].getBounds().getSouthWest();

        var contentString = '<b>Rectangle moved.</b><br>' +
            'New north-east corner: ' + ne.lat() + ', ' + ne.lng() + '<br>' +
            'New south-west corner: ' + sw.lat() + ', ' + sw.lng();

        get_trips(0,ne.lat(),sw.lat(),ne.lng(),sw.lng());


}

function move_DO(data){

    var ne = rectangles[1].getBounds().getNorthEast();
    var sw = rectangles[1].getBounds().getSouthWest();

        var contentString = '<b>Rectangle moved.</b><br>' +
            'New north-east corner: ' + ne.lat() + ', ' + ne.lng() + '<br>' +
            'New south-west corner: ' + sw.lat() + ', ' + sw.lng();

        // Set the info window's content and position.
        //infoWindow.setContent(contentString);
       // infoWindow.setPosition(ne);

       // infoWindow.open(map);

        get_trips(1,ne.lat(),sw.lat(),ne.lng(),sw.lng());

}

//type es 1 si es PU y 0 si es DO
function get_trips(type,north_PU,south_PU,east_PU,west_PU){


    //cambiado para mysql
    polygon = north_PU + "," + east_PU + "," + south_PU + "," + west_PU
    if (type == 0){
        polygon_PU =polygon
    }else if (type == 1){
        polygon_DO =polygon
    }

    /*
    //punto 1 del rectangulo arriba a la derecha, el resto en estido horario
    //van primero longitud y luego latitud (horizontal- vertical)
    var P1 = east_PU + " " + north_PU;
    var P2 = west_PU + " " + north_PU;
    var P3 = west_PU + " " + south_PU;
    var P4 = east_PU + " " + south_PU;

    //polygonFromText('POLYGON((-64.72 32.16, -80.41 25.30, -65.82 18.40, -64.72 32.16))')
    var polygon= "POLYGON(("+P1+", "+P2+", "+P3+", "+P4+", "+P1+"))";
    if (type == 0){
        polygon_PU =polygon
    }else if (type == 1){
        polygon_DO =polygon
    }
    */
    //paso parámetro 0 para que devuelva rutas mas info
    var url = "http://localhost:3000/TFG_TAXIS/get_info_2016/0," + polygon_PU + "," + polygon_DO
    callJSON(url,"get_info_filtered");
}

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function print_route(datos){ //cambiado para no repetir código
    var destino1 = parseFloat(datos[0][0]['pickup_latitude']);
    var destino2 = parseFloat(datos[0][0]['pickup_longitude']);
    var destino3 = parseFloat(datos[0][0]['dropoff_latitude']);
    var destino4 = parseFloat(datos[0][0]['dropoff_longitude']);
    calculaRutaCoords(destino1,destino2,destino3,destino4);

}
//se les pasa /null porque no tiene paramettos
//ok
function load_max_trips2016(){
    var url = "http://localhost:3000/TFG_TAXIS/max_distance_trips2016/null";
    callJSON(url,"print_route");
    callJSON(url,"Print");
}

//ok
function load_max_total_amount_trips2016(){
    var url = "http://localhost:3000/TFG_TAXIS/journey_max_total_amount_trips2016/null";
    callJSON(url,"print_route");
    callJSON(url,"Print");
}

//ok
function load_min_total_amount_trips2016(){
    var url = "http://localhost:3000/TFG_TAXIS/journey_min_total_amount_trips2016/null";
    callJSON(url,"print_route");
    callJSON(url,"Print");
}

//a partir de aquí en el comun

function total_voided_trips_2016(){
    var url = "http://localhost:3000/TFG_TAXIS/total_voided_trips/null";
    callJSON(url,"Print");
}

function total_no_charge_trips_2016(){
    var url = "http://localhost:3000/TFG_TAXIS/total_no_charge_trips/null";
    callJSON(url,"Print");
}

function total_payment_credit_trips_2016(){
    var pay = "1"
    var url = "http://localhost:3000/TFG_TAXIS/total_payment_type_trips/" + pay;
    callJSON(url,"Print");
}

function total_payment_efective_trips_2016(){
    var pay = "2"
    var url = "http://localhost:3000/TFG_TAXIS/total_payment_type_trips/" + pay;
    callJSON(url,"Print");
}

function total_rate_standar_trips_2016(){
    var tarifa = "1"
    var url = "http://localhost:3000/TFG_TAXIS/total_rate_code_trips/" + tarifa;
    callJSON(url,"Print");
}

function total_rate_negociate_trips_2016(){
    var tarifa = "5"
    var url = "http://localhost:3000/TFG_TAXIS/total_rate_code_trips/" + tarifa;
    callJSON(url,"Print");
}

function total_rate_group_trips_2016(){
    var tarifa = "6"
    var url = "http://localhost:3000/TFG_TAXIS/total_rate_code_trips/" + tarifa;
    callJSON(url,"Print");
}

function total_passengers_vendorId1_2016(){
    var vendorID = "1"
    var url = "http://localhost:3000/TFG_TAXIS/total_passengers_vendorId/" + vendorID;
    callJSON(url,"Print");
}

function total_passengers_vendorId2_2016(){
    var vendorID = "2"
    var url = "http://localhost:3000/TFG_TAXIS/total_passengers_vendorId/" + vendorID;
    callJSON(url,"Print");

}
function average_passengers_taxi_2016(){
    var url = "http://localhost:3000/TFG_TAXIS/average_passengers_taxi/null";
    callJSON(url,"Print");
}

