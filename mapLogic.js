//===================== Firebase read and push =====================//


//Initializing firebase config--stores lat/long pairs, timestamps.
var config = {
    apiKey: "AIzaSyBJ1wWHUPZJQh97JtOr4UsmKMHSwWqG_kI",
    authDomain: "speedtrapp-5cd38.firebaseapp.com",
    databaseURL: "https://speedtrapp-5cd38.firebaseio.com",
    projectId: "speedtrapp-5cd38",
    storageBucket: "speedtrapp-5cd38.appspot.com",
    messagingSenderId: "785215669568"
};
firebase.initializeApp(config);

//Setting the database variable.
var database = firebase.database();

//Getting geolocation values from users.    
navigator.geolocation.watchPosition(function(position) {
    var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };
    $("#submit").on("click", function(){
        //Saves the current time
        var now = Date.now();
        //Pushes user's latitude, longitude, and the timestamp to the database.
        database.ref().push({
            lat: pos.lat,
            lng: pos.lng,
            timestamp: now
        });
    });
});

// var ref = database.ref();
// var currentTime = Date.now();
// var cutoff = currentTime - 12 * 60 * 60 * 1000;
// var old = ref.orderByChild('timestamp').endAt(cutoff).limitToLast(1);
// var listener = old.on('child_added', function(timestampResults){
//     timestampResults.ref.remove();
// });

//On clicking the report button...
$("#submit").on("click", function(){
    //Saves the current time
    var now = Date.now();
    //Pushes user's latitude, longitude, and the timestamp to the database.
    database.ref().push({
        lat: pos.lat,
        lng: pos.lng,
        timestamp: now
    });
});

//=============================Google Maps=============================

//Defining globals heatmap and map.
var heatmap;
var map;

//Defining the google map parameters.
function initMap() {

    //Setting global map varaible to the document div id googleMap, with a center and a zoom close enough to view. 
    map = new google.maps.Map(document.getElementById('googleMap'), {
        center: {lat: 39.7392, lng: -104.9903},
        zoom: 10
    });

    //Setting the heatmap variable to the google maps visualization library layer, with data supplied by the getPoints function, manipulating the map as defined above.
    heatmap = new google.maps.visualization.HeatmapLayer({
        data: getPoints(),
        map: map
    });

    //Creating the info window. 
    infoWindow = new google.maps.InfoWindow;

    //Checking geolocation again...
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

//Getting the heatmap.
function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap() ? null : map);
}

//Setting the gradient color scheme
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

//Creating the radius.
// function changeRadius() {
//     heatmap.set('radius', heatmap.get('radius') ? null : 20);
// }
         

//Error handling
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?              'Error: The Geolocation service failed.' : 'Error: Your browser does not support geolocation.');
    infoWindow.open(map);
}

//Initializing a coordinate list array.
var coordList = [];

//gatherCoordinates function will populate the coordList array...
function gatherCoordinates() { 
    //With the lat-long pairs that exist on Firebase.
    database.ref().on("child_added", function(results) {
        var latCoord = results.val().lat;
        var lngCoord = results.val().lng;
        var googleMapsCoordPair = new google.maps.LatLng(latCoord, lngCoord);
        //Reading them and then pushing them as a google maps LatLng item to the coordList variable.
        coordList.push(googleMapsCoordPair);
    });
}

//Calling the gather Coordinates function.
gatherCoordinates();

//getPoints function is called in the heatmap object, meaning that the heatmap datalayer will be defined by the coordinates in our firebase.
function getPoints() {
    return coordList;
}

//============================Weather API==============================

//Defining the global variable to hold the API url. 
var weatherApi;

//Getting geolocation to load one last time--The API code cannot run on current location without finding lat long pairs.
navigator.geolocation.watchPosition(function(position) {
    pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };

    //Now sets the weather API url to the geolocated latitude and longitude.
    weatherApi = "https://api.openweathermap.org/data/2.5/weather?lat=" + pos.lat + "&lon=" + pos.lng + "&appid=eedb0cb56348964c7e81f8ffed687249";

    //Running AJAX
    $.ajax({
        url: weatherApi,
        method: "GET"
    }).then(function (data) {
        //If the weather along the route appears to be hail, warn the user about hail reports in their area.
        if(data.weather[0].main === "rain"){
            $("#weather").html("<i class='fas fa-cloud'>        Hazardous Weather Predicted Along Your route</i>");
        } else if(data.weather[0].description === "hail"){
            $("#weather").html("<i class='fas fa-cloud'>        Warning! Hail Reported at Your Destination!</i>");
        }else {
            $("#weather").append(data.weather[0].main);
        }
    });
});


//This code is meant to find speed traps based on lat lng pairs, but our code is now not relying on any database to flag traffic or slowdowns, so this code isn't functional. 

//     var dangerCoord = {lat: 39.7392, lng:-104.9903};
//     var exampleAlert = {lat: 39.7392, lng:-104.9903};

//     //console.log(dangerCoord);
//     //console.log(exampleAlert);

//     if(dangerCoord.lat === exampleAlert.lat && dangerCoord.lng === exampleAlert.lng){
//         //console.log("Danger Zone Found Again");
//         // alert("Danger Zone Found Again");
//         $("#speeding").html('<i class="fas fa-tachometer-alt">      A speeding trap has been found at  </i>' +  "  " + dangerCoord.lat + ", " + dangerCoord.lng);
//         $("#construction").html("<i class='fas fa-wrench'>      Construction has been reported on your route at...</i>");
//         $("#traffic").html("<i class='fa fa-car'>   Traffic has been reported on your route at...</i>");
//         $("#entering-town").html("<i class='fas fa-building'>       Be prepared to reduce your speed as you enter town from the highway</i>");
//         $("#weather").html("<i class='fas fa-cloud'></i>");
//     };
// });