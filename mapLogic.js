var pos;

var config = {
    apiKey: "AIzaSyBJ1wWHUPZJQh97JtOr4UsmKMHSwWqG_kI",
    authDomain: "speedtrapp-5cd38.firebaseapp.com",
    databaseURL: "https://speedtrapp-5cd38.firebaseio.com",
    projectId: "speedtrapp-5cd38",
    storageBucket: "speedtrapp-5cd38.appspot.com",
    messagingSenderId: "785215669568"
};

firebase.initializeApp(config);

var database = firebase.database();
    
navigator.geolocation.watchPosition(function(position) {
    pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };
});


$("#submit").on("click", function(){
    database.ref().push({
        lat: pos.lat,
        lng: pos.lng
    });
});

var heatmap;
var map;

function initMap() {

    map = new google.maps.Map(document.getElementById('googleMap'), {
        center: {lat: 39.7392, lng: -104.9903},
        zoom: 8
    });

    heatmap = new google.maps.visualization.HeatmapLayer({
        data: getPoints(),
        map: map
    });

    infoWindow = new google.maps.InfoWindow;

    // database.ref().on("child_added", function(snapshot) {
    //     var addMarkerLat = snapshot.val().lat;
    //     var addMarkerLng = snapshot.val().lng;
    //     var databaseMarker = new google.maps.Marker({
    //         position: {lat: addMarkerLat, lng: addMarkerLng},
    //         map: map,
    //         title: "Ping"
    //     });
    // });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });


    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
    var gradient = [
      'rgba(0, 255, 255, 0)',
      'rgba(0, 255, 255, 1)',
      'rgba(0, 191, 255, 1)',
      'rgba(0, 127, 255, 1)',
      'rgba(0, 63, 255, 1)',
      'rgba(0, 0, 255, 1)',
      'rgba(0, 0, 223, 1)',
      'rgba(0, 0, 191, 1)',
      'rgba(0, 0, 159, 1)',
      'rgba(0, 0, 127, 1)',
      'rgba(63, 0, 91, 1)',
      'rgba(127, 0, 63, 1)',
      'rgba(191, 0, 31, 1)',
      'rgba(255, 0, 0, 1)'
    ]
    heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
    heatmap.set('radius', heatmap.get('radius') ? null : 20);
}
                
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?              'Error: The Geolocation service failed.' : 'Error: Your browser does not support geolocation.');
    infoWindow.open(map);
}

coordList = [];

function gatherCoordinates() {    
    database.ref().on("child_added", function(results) {
        var latCoord = results.val().lat;
        console.log(latCoord);
        var lngCoord = results.val().lng;
        var googleMapsCoordPair = new google.maps.LatLng(latCoord, lngCoord);
        coordList.push(googleMapsCoordPair);
    });
}

gatherCoordinates();

function getPoints() {
    return coordList;
}

console.log(coordList);

