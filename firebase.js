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

setInterval(function(){
    console.log(pos);
}, 1000);


$("#submit").on("click", function(){
    database.ref().push({
        
        lat: pos.lat,
        lng: pos.lng

    });
});