var map

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
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // Agregando el mapa al tag de id googleMap
    map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
        
    /*
    // Definiendo las coordenadas para el path del polígono
    var triangleCoords = [
        {lat: -34.6036844, lng: -58.381559100000004}, // Brasil
        {lat: -14.235004, lng: -51.92527999999999},// Argentina
        {lat: -33.4488897, lng: -70.6692655} // Chile
    ];
       
    // Construyendo el póligono
    var poligono = new google.maps.Polygon({
        paths: triangleCoords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
    });
    poligono.setMap(map);
    */
    var marker = new google.maps.Marker({
        position: {lat: 40.7142700, lng: -74.0059700},
        map: map,
        title: 'Hello World!'
    });

     
}

function Ejemplo(datos){
    console.log("hola")
    console.log(datos.results[0].data[0][1])
    console.log(datos.results[0].data[0][2])

    var cord2 = parseFloat(datos.results[0].data[0][1])
    var cord1 = parseFloat(datos.results[0].data[0][2])

  
    var marca = new google.maps.Marker({
        position: {lat: cord1, lng: cord2},
        //position: {lat: -73.871330261230, lng: 40.773773193359},
        map: map,
        title: 'Hello World!2222'
    });
    marca.setMap(map);
}

function carga(){

     console.log("hola")
    var url = "http://localhost:8080/api/1.0/?Procedure=max_distance_trips2016";
    console.log(url)
    callJSON(url,"Ejemplo");
}


/*
var url = "http://localhost:8080/api/1.0/" +
            "?Procedure=GetAlertsByLocation&Parameters=" +
            "["4"]";
callJSON(url,"ejemplo");
*/

