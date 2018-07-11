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

function initMap() {

    var map = new google.maps.Map(document.getElementById('googleMap'), {
        center: {lat: 39.7392, lng: -104.9903},
        zoom: 8
    });

    infoWindow = new google.maps.InfoWindow;

    var marker = new google.maps.Marker({
        position: {lat: 39.7392, lng: -104.9903},
        map: map, 
        title: 'Denver'
    });

    var exampleSpeedTrap = new google.maps.Marker({
        position: {lat: 40.1039, lng: -105.1708},
        map: map,
        title: "ExampleSpeedTrap"
    });

    database.ref().on("child_added", function(snapshot) {
        var addMarkerLat = snapshot.val().lat;
        var addMarkerLng = snapshot.val().lng;
        console.log(addMarkerLat, addMarkerLng);
        var databaseMarker = new google.maps.Marker({
            position: {lat: addMarkerLat, lng: addMarkerLng},
            map: map,
            title: "Ping"
        });
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            alert("Geo is enabled.")
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });


    } else {
        handleLocationError(false, infoWindow, map.getCenter());
        alert("geo is not enabled on this device.");
    }
}
                
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?              'Error: The Geolocation service failed.' : 'Error: Your browser does not support geolocation.');
    infoWindow.open(map);
}
