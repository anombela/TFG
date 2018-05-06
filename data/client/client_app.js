var map;
var markers = [];
var rectangles = ["Rectangle_PU","Rectangle_PO"];
var infoWindow;
var mapupdater;

function init() {
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
function getRectangle_PO(){ 
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
    if (rectangles[1] != "Rectangle_PO"){
        rectangles[1].setMap(null);
    }
    rectangles[1] = rectangle
    rectangle.setMap(map);
    rectangle.addListener('bounds_changed', move_PO);


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

        get_trips(ne.lat(),sw.lat(),ne.lng(),sw.lng());


}

function move_PO(data){
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


}

function get_trips(north_PU,south_PU,east_PU,west_PU){
    var url = "http://localhost:8080/api/1.0/?Procedure=get_info_2016&Parameters=" +
            "[" + north_PU + "," + south_PU + "," + east_PU + "," + west_PU + "]";
    console.log(url)
    callJSON(url,"Count_Trips");
}

function Count_Trips(datos){

    console.log(datos.results[0].data[0][0]);
    var x = document.getElementById("num_trips");
    x.innerHTML = datos.results[0].data[0][0];
}
