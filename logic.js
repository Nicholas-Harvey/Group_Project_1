var coordinateArray = [
    {
        objectName: "Miners Museum",
        objectLatitude: 39.99,
        objectLongitude: -105.08
    },
    {
        objectName: "Dairy Queen Lafayette",
        objectLatitude: 40.01,
        objectLongitude: -105.10
    },
    {
        objectName: "Home",
        objectLatitude: 39.98,
        objectLongitude: -104.71
    },
    {
        objectName: "Illegal Petes DU",
        objectLatitude: 39.67,
        objectLongitude: -104.96
    },
    {
        objectName: "Westminster Station",
        objectLatitude: 39.82,
        objectLongitude: -105.02
    },
    {
        objectName: "Denver Union Station",
        objectLatitude: 39.75,
        objectLongitude: -105.00
    },
    {
        objectName: "Police Station",
        objectLatitude: 39.68,
        objectLongitude: -104.96
    },
    {
        objectName: "Chamberlin Observatory",
        objectLatitude: 39.67,
        objectLongitude: -104.96
    },
    {
        objectName: "104th & 84th",
        objectLatitude: 39.84,
        objectLongitude: -104.98
    }
];

function getLocation() {

    console.log("Location obtained");
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
        $("#location").html("Geolocation is not supported by this browser.");
    }
}

//The app has a minimum driving speed to function. This minimum speed is defined by the precision of coordinate measurement, and how many times the 
//function is called. 
//With map coordinates, the third decimal point measures a distance of 0.068 miles.
//The functions are called every ten seconds. Therefore, the user must be traveling at least 0.068 miles every ten seconds, or about 24 miles per hour. 
function showPosition(position) {
    $("#location").html("Latitude: " + "<span id='latitudeSpan'>" + position.coords.latitude + "</span>" +
        "<br>Longitude: " + "<span id='longitudeSpan'>" + position.coords.longitude + "</span>");
    console.log("test");
};

getLocation();

var newLatitude = $("#latitudeSpan").html();
console.log("New Latitude is " + newLatitude);
var oldLatitude;
var newLongitude = $("#longitudeSpan").html();
console.log("New longitude is " + newLongitude);
var oldLongitude;

function newValues() {

    $("#direction").html("");

    oldLatitude = newLatitude;
    console.log("Old Latitude is " + oldLatitude);
    newLatitude = $("#latitudeSpan").html();
    console.log("New latitude is " + newLatitude);
    oldLongitude = newLongitude;
    console.log("Old longitude is " + oldLongitude);
    newLongitude = $("#longitudeSpan").html();
    console.log("New longitude is " + newLongitude);

};

//Alert sound is pup_alert by willy_ineedthatapp_com https://freesound.org/people/willy_ineedthatapp_com/sounds/167337/, licensed under Creative Commons 0
var alertSound = new Audio('assets/audio/167337__willy-ineedthatapp-com__pup-alert.mp3');

$("#playAlert").on("click", function () {

    playAlert();

});

//This code is used to 'snooze' the proximity alert, by checking the value of a counter variable

var counter = 0;
console.log("counter value is: " + counter);

function resetCounter() {
    counter = 0;
    console.log("resetCounter has been called");
};

function playAlert() {
    if (counter === 0) {
        counter = 1;
        console.log("Counter value is now: " + counter);
        alertSound.play();
       
        console.log("Alert sound has been played");
        setTimeout(resetCounter, 60000);
        console.log("Counter reset timer has been set");
    } else if (counter === 1) {
        console.log("Alert is on snooze");
    }
};

//oldX is the x-coordinate from an old position, newX is the updated value. Ditto for oldY and newY
var direction;

//LONGITUDE is x
//Latitude is y

function currentDirection() {

    if ((newLongitude < oldLongitude) && (newLatitude === oldLatitude)) {
        direction = "east";
        $("#direction").html(direction);
        console.log(direction);
    } else if ((newLongitude > oldLongitude) && (newLatitude === oldLatitude)) {
        direction = "west";
        $("#direction").html(direction);
        console.log(direction);
    } else if ((newLongitude === oldLongitude) && (newLatitude > oldLatitude)) {
        direction = "north";
        $("#direction").html(direction);
        console.log(direction);
    } else if ((newLongitude === oldLongitude) && (newLatitude < oldLatitude)) {
        direction = "south";
        $("#direction").html(direction);
        console.log(direction);
    } else if ((newLongitude < oldLongitude) && (newLatitude > oldLatitude)) {
        direction = "northeast";
        $("#direction").html(direction);
        console.log(direction);
    } else if ((newLongitude < oldLongitude) && (newLatitude < oldLatitude)) {
        direction = "southeast";
        $("#direction").html(direction);
        console.log(direction);
    } else if ((newLongitude > oldLongitude) && (newLatitude < oldLatitude)) {
        direction = "southwest";
        $("#direction").html(direction);
        console.log(direction);
    } else if ((newLongitude > newLongitude) && (newLatitude > oldLatitude)) {
        direction = "northwest";
        $("#direction").html(direction);
        console.log(direction);
    } else {
        direction = "Position has not substantially changed"
        $("#direction").html(direction);
        console.log(direction);
    }
}

//This code looks for changes in the second decimal point, which, on a map, is accurate to 1.1 KM, or .68 miles.
//Core idea: If user is moving along an axis, a point behind them will have either a higher or lower coordinate value. 
//I have broken this code into blocks for now, to work it would need to be called as part of a for-loop that looped
//through an array of coordinates. The for-loop functon can be called using a setInterval.

function proximityCheck() {
    for (var i = 0; i < coordinateArray.length; i++) {

        //console.log(coordinateArray[i].objectName);

        if (((newLatitude < coordinateArray[i].objectLatitude) && (newLatitude > (coordinateArray[i].objectLatitude - 0.01))) && (newLongitude === coordinateArray[i].objectLongitude)) {
            playAlert();
            console.log("Yeah, baby!");
            console.log(coordinateArray[i].objectName);
            $("#location-two").html(coordinateArray[i].objectName);
        } else if (((newLatitude > coordinateArray[i].objectLatitude) && (newLatitude < (coordinateArray[i].objectLatitude + 0.01))) && (newLongitude === coordinateArray[i].objectLongitude)) {
            playAlert();
            console.log("Yeah, baby!");
            console.log(coordinateArray[i].objectName);
            $("#location-two").html(coordinateArray[i].objectName);
        } else if (((newLongitude > coordinateArray[i].objectLongitude) && (newLongitude < (coordinateArray[i].objectLongitude + 0.01))) && (newLatitude === coordinateArray[i].objectLatitude)) {
            playAlert();
            console.log("Yeah, baby!");
            console.log(coordinateArray[i].objectName);
            $("#location-two").html(coordinateArray[i].objectName);
        } else if (((newLongitude < coordinateArray[i].objectLongitude) && (newLongitude > (coordinateArray[i].objectLongitude - 0.01))) && (newLatitude === coordinateArray[i].objectLatitude)) {
            playAlert();
            console.log("Yeah, baby!");
            console.log(coordinateArray[i].objectName);
            $("#location-two").html(coordinateArray[i].objectName);
        } else if (((newLatitude < coordinateArray[i].objectLatitude) && (newLatitude > (coordinateArray[i].objectLatitude - 0.01))) && ((newLongitude < coordinateArray[i].objectLongitude) && (newLongitude > (coordinateArray[i].objectLongitude - 0.01)))) {
            playAlert();
            console.log("Yeah, baby!");
            console.log(coordinateArray[i].objectName);
            $("#location-two").html(coordinateArray[i].objectName);
        } else if (((newLatitude > coordinateArray[i].objectLatitude) && (newLatitude < (coordinateArray[i].objectLatitude + 0.01))) && ((newLongitude < coordinateArray[i].objectLongitude) && (newLongitude > (coordinateArray[i].objectLongitude - 0.01)))) {
            playAlert();
            console.log("Yeah, baby!");
            console.log(coordinateArray[i].objectName);
            $("#location-two").html(coordinateArray[i].objectName);
        } else if (((newLatitude > coordinateArray[i].objectLatitude) && (newLatitude < (coordinateArray[i].objectLatitude + 0.01))) && ((newLongitude > coordinateArray[i].objectLongitude) && (newLongitude < (coordinateArray[i].objectLongitude + 0.01)))) {
            playAlert();
            console.log("Yeah, baby!");
            console.log(coordinateArray[i].objectName);
            $("#location-two").html(coordinateArray[i].objectName);
        } else if (((newLatitude < coordinateArray[i].objectLatitude) && (newLatitude > (coordinateArray[i].objectLatitude - 0.01))) && ((newLongitude > coordinateArray[i].objectLongitude) && (newLongitude < (coordinateArray[i].objectLongitude + 0.01)))) {
            playAlert();
            console.log("Yeah, baby!");
            console.log(coordinateArray[i].objectName);
            $("#location-two").html(coordinateArray[i].objectName);
        } else {
            $("#location-three").html("You are not near any of the coordinates.");
            console.log("Sorry, Charlie");
        }
        /* else if (((newLatitude > (coordinateArray[i].objectLatitude - 0.01)) && (newLatitude < (coordinateArray[i].objectLatitude + 0.01))) && ((newLongitude > (coordinateArray[i].objectLongitude - 0.01)) && (newLongitude < (coordinateArray[i].objectLongitude + 0.01)))) {
            playAlert();
            console.log("Yeah, baby!");
            $("#direction-two").html(coordinateArray[i].objectName);
        } else if ((newLatitude === coordinateArray[i].objectLatitude) && (newLongitude === coordinateArray[i].objectLongitude)) {
            playAlert();
            console.log("Yeah, baby!");
            $("#direction-two").html(coordinateArray[i].objectName);
        } */

    }
}

setInterval(function () {
    newValues();
    currentDirection();
    proximityCheck();
}, 10000);