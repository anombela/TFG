var map;
var markers = [];
var rectangles = ["Rectangle_PU","Rectangle_DO"];
var infoWindow;
var mapupdater;
var polygon_PU = '';
var polygon_DO = '';


function reset_coord(coord){
	//console.log("entraaaaaa");
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


function init() {
	reset_coord("polygon_PU");
	reset_coord("polygon_DO");
    initialize();

}



function callJSON(url,callback) {
   var script = document.createElement('script');
   var head = document.getElementsByTagName('head')[0];
   script.src = url + "&jsonp="  + callback;
   script.id = callback;
   head.appendChild(script);
}

function initialize() {
    // Configuración del mapa
    var mapProp = {
        center: {lat: 40.7142700, lng: -74.0059700},
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // Agregando el mapa al tag de id googleMap
    map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    infoWindow = new google.maps.InfoWindow();

}

////////////////////////s

function Max_Trip(datos){

    var cord2 = parseFloat(datos.results[0].data[0][1])
    var cord1 = parseFloat(datos.results[0].data[0][2])
    var marker = new google.maps.Marker({
        position: {lat: cord1, lng: cord2},
        //position: {lat: -73.871330261230, lng: 40.773773193359},
        map: map,
        title: 'Ruta mas larga'
    });
    marker.setMap(map);
    markers.push(marker);
}

function carga(){
    var url = "http://localhost:8080/api/1.0/?Procedure=max_distance_trips2016";
    callJSON(url,"Max_Trip");
    callJSON(url,"Print_Table");
}

//pinta todos los marcadores que hay en el array
function setMapOnAll(aux) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(aux);
    }
}

//elimina todos los marcadores
function clearMarkers() {
    setMapOnAll(null);
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
    console.log(datos.results[0].schema.length);
    var x = document.getElementById("num_trips");
    x.innerHTML = datos.results[0].data.length;

    var t_head = '<tr>';
    for (var i=0;i<datos.results[0].schema.length;i++){
    	t_head+= "<th>"+datos.results[0].schema[i].name+"</th>";
    }
    t_head += '</tr>';
    console.log(t_head);
    var t1 = document.getElementById("table_head");
    t1.innerHTML = t_head;


    var t_info = '';
    for (var i=0;i<datos.results[0].data.length;i++){
    	t_info += '<tr>';
    	for (var j=0;j<datos.results[0].data[i].length;j++){
    	
    		t_info+= "<td>"+datos.results[0].data[i][j]+"</td>";
    	}
    	t_info += '</tr>';
    }
    console.log(t_info);
    var t1 = document.getElementById("table_info");
    t1.innerHTML = t_info;
}
