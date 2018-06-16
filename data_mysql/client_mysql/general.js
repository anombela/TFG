var map;
var rectangles = ["Rectangle_PU","Rectangle_DO"];
var mapupdater;
//cambiado para mysql
var polygon_PU = "90,180,-90,-180"; //norte,oeste,syr,este
var polygon_DO = "90,180,-90,-180";
var zone_PU = '';
var zone_DO = '';
var current_year = 0;


//************INIcializa el mapa***************************

var rendererOptions = {draggable: true};
var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);;
var directionsService = new google.maps.DirectionsService();


function initialize() {

    var mapOptions = {
        zoom: 10,
        center: {lat: 40.7142700, lng: -74.0059700}
    };
      
    map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directionsPanel'));

    google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
        distanciaTotal(directionsDisplay.getDirections());
    });
}

function calculaRutaName(str1,str2) {

    var request = {
        origin: str1 + ',' +'Nueva York, EE. UU',
        destination: str2 + ',' +'Nueva York, EE. UU',
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
}

function calculaRutaCoords(str1,str2,str3,str4) {

    var request = {
        origin: {lat: str1, lng: str2},
        destination: {lat: str3, lng: str4},
        travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
}

function distanciaTotal(result) {
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
    }
    total = total / 1000.0;
    document.getElementById('total').innerHTML = total + ' km';
}
google.maps.event.addDomListener(window, 'load', initialize);

//**************fin inicializar mapa****///////////////


function slespsed(){
    var url = "http://localhost:8080/api/1.0/?Procedure=time_slespsed";
    callJSON(url,"Print");
}


function reset_coord(coord){
    /*
	var P1 = "180" + " " + "90";
    var P2 = "-180" + " " + "90";
    var P3 = "-180" + " " + "-90";
    var P4 = "180" + " " + "-90";
	var polygon= "POLYGON(("+P1+", "+P2+", "+P3+", "+P4+", "+P1+"))";
	if (coord == "polygon_PU"){
		polygon_PU =polygon;
	}else if (coord == "polygon_DO"){
		polygon_DO =polygon;
	}
    */
    //cambiado para mysql
    var polygon = "90,180,-90,-180";
    if (coord == "polygon_PU"){
        polygon_PU = polygon;
    }else if (coord == "polygon_DO"){
        polygon_DO = polygon;
    }
}


function select_year(year){
    current_year = year;
    reset_coord("polygon_PU");
    reset_coord("polygon_DO");
    reset_table();
    var x = document.getElementById("year");
    if (year ==0){
        x.innerHTML = "Total";
        $(".button_show").hide();
    }else{
        x.innerHTML = year;
        $(".button_show").show();
    }
   	var y = document.getElementById("directionsPanel");
    y.innerHTML = "<p>Distancia Total: <span id='total'></span></p>";
    if (rectangles[0] != "Rectangle_PU"){
        rectangles[0].setMap(null);
    }
    if (rectangles[1] != "Rectangle_DO"){
        rectangles[1].setMap(null);
    }
    directionsDisplay.setDirections({routes: []});
}

function init() {
    $( "#tabs" ).tabs();
	reset_coord("polygon_PU");
	reset_coord("polygon_DO");
/*
    var url = "http://localhost:8080/api/1.0/?Procedure=get_info_2017&Parameters=[-1,'','']";
    callJSON(url,"get_zones_2017");*/

}

function callJSON(url,callback) {
    //cambiado paramysql
    $.getJSON(url, function(data) {
        eval(callback + '(data.data);');
    });
//esto era para voltdb
/*
   var script = document.createElement('script');
   var head = document.getElementsByTagName('head')[0];
   script.src = url + "&jsonp="  + callback;
   script.id = callback;
   head.appendChild(script);
*/
}


function reset_table(){

    document.getElementById("num_trips").innerHTML = '';
    document.getElementById("table_head").innerHTML = '';
    document.getElementById("table_info").innerHTML = '';
    document.getElementById("most_expensive_trip").innerHTML = '';
    document.getElementById("most_cheap_trip").innerHTML = '';
    document.getElementById("max_distance").innerHTML = '';
    document.getElementById("min_distance").innerHTML = '';

}
function print_route(datos){ //cambiado para no repetir código
    var destino1 = parseFloat(datos[0][0]['pickup_latitude']);
    var destino2 = parseFloat(datos[0][0]['pickup_longitude']);
    var destino3 = parseFloat(datos[0][0]['dropoff_latitude']);
    var destino4 = parseFloat(datos[0][0]['dropoff_longitude']);
    calculaRutaCoords(destino1,destino2,destino3,destino4);

}

function get_info_filtered(datos){
    console.log(datos);
    Print_Table(datos[0]);//siempre que se llame, una cosa u otrta se va a pintar

    if (datos[0].length != 0){
        var destino1 = parseFloat(datos[0][0]['pickup_latitude']);
        var destino2 = parseFloat(datos[0][0]['pickup_longitude']);
        var destino3 = parseFloat(datos[0][0]['dropoff_latitude']);
        var destino4 = parseFloat(datos[0][0]['dropoff_longitude']);

        if (current_year == 2016){
            calculaRutaCoords(destino1,destino2,destino3,destino4);
        }else{
            calculaRutaName(zone_PU,zone_DO);
        }
    }
    if (datos.length > 2){
        var t2 = document.getElementById("most_expensive_trip");
        var t3 = document.getElementById("most_cheap_trip");
        var t4 = document.getElementById("max_distance");
        var t5 = document.getElementById("min_distance");

        t2.innerHTML = parseFloat(datos[1][0]['max_amount']);
        t3.innerHTML = parseFloat(datos[1][0]['min_amount']);
        t4.innerHTML = parseFloat(datos[1][0]['max_distance']);
        t5.innerHTML = parseFloat(datos[1][0]['min_distance']);
    }
}   

function get_filtered_trip(type){

    if (current_year == 2016){
        var url = "http://localhost:3000/TFG_TAXIS/get_info_2016/" + type + "," + polygon_PU + "," + polygon_DO

    }else{
         var url = "http://localhost:8080/api/1.0/?Procedure=get_info_2017&Parameters=" + 
              "[" + type + ",'" +  zone_PU + "','" + zone_DO + "']";
    }
    callJSON(url,"get_info_filtered");


}

function Print(datos){
	for (var i=0;i<datos.length-1;i++){
            Print_Table(datos[i]);
        }

}

function Print_Table(datos){//se lepasa unobjeto solo, datos ya es datos.results[i]
    var x = document.getElementById("num_trips");
    var t = document.getElementById("table_head");
    var t1 = document.getElementById("table_info");

    x.innerHTML = datos.length;

    var t_head = '<tr>';
   for (j in datos[0]){
    	t_head+= "<th>"+ j +"</th>";
    }
    t_head += '</tr>';
    t.innerHTML = t_head;


    var t_info = '';
    if (current_year == 2016){
        for (var i=0;i<datos.length;i++){
            t_info += '<tr onclick="javascript:calculaRutaCoords('+ datos[i]["pickup_latitude"] +','+datos[i]["pickup_longitude"]  
                +','+datos[i]["dropoff_latitude"]+','+datos[i]["dropoff_longitude"]+');">';
            for (j in datos[i]){
        
                t_info+= "<td>"+datos[i][j]+"</td>";
            }
            t_info += '</tr>';
        }
    }else{
        for (var i=0;i<datos.length;i++){
            var strings = "";//"'" +datos.data[i][0]+"','" + datos.data[i][1] +"'";
            t_info += '<tr onclick="javascript:calculaRutaName('+ strings +');">';
             for (j in datos[i]){
        
                t_info+= "<td>"+datos[i][j]+"</td>";
            }
            t_info += '</tr>';
        }
    }
    t1.innerHTML = t_info;

}


