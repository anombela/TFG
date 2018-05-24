var map;
//var markers = [];
var rectangles = ["Rectangle_PU","Rectangle_DO"];
var infoWindow;
var mapupdater;
var polygon_PU = '';
var polygon_DO = '';
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
    infoWindow = new google.maps.InfoWindow();
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
    console.log(str1,str2,str3,str4);

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


function reset_coord(coord){
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
}


function select_year(year){
    current_year = year;
    reset_coord("polygon_PU");
    reset_coord("polygon_DO");
    Print_Table(null);
    var x = document.getElementById("year");
    if (year ==0){
        x.innerHTML = "Total";
    }else{
        x.innerHTML = year;
    }
   directionsDisplay.setDirections({routes: []}); ///ver comomejorar esto
    var y = document.getElementById("directionsPanel");
    y.innerHTML = "<p>Distancia Total: <span id='total'></span></p>";
    if (rectangles[0] != "Rectangle_PU"){
        rectangles[0].setMap(null);
    }
    if (rectangles[1] != "Rectangle_DO"){
        rectangles[1].setMap(null);
    }

}

function init() {
    $( "#tabs" ).tabs();
	reset_coord("polygon_PU");
	reset_coord("polygon_DO");
    //initialize();



}

function callJSON(url,callback) {
   var script = document.createElement('script');
   var head = document.getElementsByTagName('head')[0];
   script.src = url + "&jsonp="  + callback;
   script.id = callback;
   head.appendChild(script);
}

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
    console.log(data)

    var ne = rectangles[0].getBounds().getNorthEast();
    var sw = rectangles[0].getBounds().getSouthWest();

        var contentString = '<b>Rectangle moved.</b><br>' +
            'New north-east corner: ' + ne.lat() + ', ' + ne.lng() + '<br>' +
            'New south-west corner: ' + sw.lat() + ', ' + sw.lng();

        // Set the info window's content and position.
        infoWindow.setContent(contentString);
        infoWindow.setPosition(ne);

        infoWindow.open(map);

        get_trips(0,ne.lat(),sw.lat(),ne.lng(),sw.lng());


}

function move_DO(data){
    console.log(data)

    var ne = rectangles[1].getBounds().getNorthEast();
    var sw = rectangles[1].getBounds().getSouthWest();

        var contentString = '<b>Rectangle moved.</b><br>' +
            'New north-east corner: ' + ne.lat() + ', ' + ne.lng() + '<br>' +
            'New south-west corner: ' + sw.lat() + ', ' + sw.lng();

        // Set the info window's content and position.
        infoWindow.setContent(contentString);
        infoWindow.setPosition(ne);

        infoWindow.open(map);

        get_trips(1,ne.lat(),sw.lat(),ne.lng(),sw.lng());

}

//////////////////////////FUNCIONES PARAOBTENER DISTINTAS RUTAS/////////////////////////////////
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

////////////////////////////////////////////////////////////////////////////////////////////////////////

//type es 1 si es PU y 0 si es DO
function get_trips(type,north_PU,south_PU,east_PU,west_PU){


	//punto 1 del rectangulo arriba a la derecha, el resto en estido horario
	//van primero longitud y luego latitud (horizontal- vertical)
	var P1 = east_PU + " " + north_PU;
    var P2 = west_PU + " " + north_PU;
    var P3 = west_PU + " " + south_PU;
    var P4 = east_PU + " " + south_PU;

	//polygonFromText('POLYGON((-64.72 32.16, -80.41 25.30, -65.82 18.40, -64.72 32.16))')
	var polygon= "POLYGON(("+P1+", "+P2+", "+P3+", "+P4+", "+P1+"))";
	if (type == 0){
		console.log("polygon_PU =polygon");
		polygon_PU =polygon
	}else if (type == 1){
		console.log("polygon_Do =polygon");
		polygon_DO =polygon
	}


    var url = "http://localhost:8080/api/1.0/?Procedure=get_info_2016&Parameters=" + 
    		  "['" +  polygon_PU + "','" + polygon_DO + "']";
    console.log(url);
    callJSON(url,"Print_Table");
}

function Print_Table(datos){

	console.log(datos);

    var x = document.getElementById("num_trips");
    var t = document.getElementById("table_head");
    var t1 = document.getElementById("table_info");
    var t2 = document.getElementById("most_expensive_trip");
    var t3 = document.getElementById("most_cheap_trip");
    var t4 = document.getElementById("max_distance");
    var t5 = document.getElementById("min_distance");

    
    if (datos == null){
        x.innerHTML = "";
        t.innerHTML = "";
        t1.innerHTML = "";
        t2.innerHTML = "";
        t3.innerHTML = "";
        t4.innerHTML = "";
        t5.innerHTML = "";
        return;
    }

    x.innerHTML = datos.results[0].data.length;

    var t_head = '<tr>';
    for (var i=0;i<datos.results[0].schema.length;i++){
    	t_head+= "<th>"+datos.results[0].schema[i].name+"</th>";
    }
    t_head += '</tr>';
    t.innerHTML = t_head;


    var t_info = '';
    if (current_year == 2016){
        for (var i=0;i<datos.results[0].data.length;i++){
            t_info += '<tr onclick="javascript:calculaRutaCoords('+ datos.results[0].data[i][6]+','+datos.results[0].data[i][5] +','+datos.results[0].data[i][10]+','+datos.results[0].data[i][9]+');">';
            for (var j=0;j<datos.results[0].data[i].length;j++){
        
                t_info+= "<td>"+datos.results[0].data[i][j]+"</td>";
            }
            t_info += '</tr>';
        }
    }else{
        for (var i=0;i<datos.results[0].data.length;i++){
            t_info += '<tr>';
            for (var j=0;j<datos.results[0].data[i].length;j++){
        
                t_info+= "<td>"+datos.results[0].data[i][j]+"</td>";
            }
            t_info += '</tr>';
        }
    }
    t1.innerHTML = t_info;

    //segunda query
    if (datos.results[1].data.length > 0 ){
        t2.innerHTML = datos.results[1].data[0][18];
    }else{
        t2.innerHTML = 0;
    }

    //tercera query
    if (datos.results[2].data.length > 0 ){
        t3.innerHTML = datos.results[2].data[0][18];
    }else{
        t3.innerHTML = 0;
    }

     //cuarta query
    if (datos.results[3].data.length > 0 ){
        t4.innerHTML = datos.results[3].data[0][4];
    }else{
        t4.innerHTML = 0;
    }


       //quinta query
    if (datos.results[4].data.length > 0 ){
        t5.innerHTML = datos.results[4].data[0][4];
    }else{
        t5.innerHTML = 0;
    }

}
