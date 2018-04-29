function initialize() {
        // Configuración del mapa
        var mapProp = {
          center: {lat: 40.7142700, lng: -74.0059700},
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        // Agregando el mapa al tag de id googleMap
        var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
        
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