var coordinateArray = [];

// database.ref().on("child_added", function(results) {
//     //console.log(results.val().lat);
//     //console.log(results.val().lng);
//     var coordObject = {
//         xCoordinate: results.val().lat,
//         yCoordinate: results.val().lng
//     };
//     coordinateArray.push(coordObject); 
// });

//console.log("logic.js is trying to read:", coordinateArray);
    
    function getLocation() {
    
        //console.log("Location obtained");
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
        $("#location").html("Latitude: " + "<span id='xPos'>" + position.coords.longitude.toFixed(4) + "</span>" +
            "<br>Longitude: " + "<span id='yPos'>" + position.coords.latitude.toFixed(4) + "</span>");
        //console.log("test");
    };
    
    getLocation();
    
    var newX = $("#xPos").html();
    //console.log("newX is " + newX);
    var oldX;
    var newY = $("#yPos").html();
    //console.log("newY is " + newY);
    var oldY;
    
    function newValues() {
    
        $("#direction").html("");
    
        oldX = newX;
        console.log("oldX is " + oldX);
        newX = $("#xPos").html();
        console.log("newX is " + newX);
        oldY = newY;
        console.log("oldY is " + oldY);
        newY = $("#yPos").html();
        console.log("newY is " + newY);
    
    };
    
    //Alert sound is pup_alert by willy_ineedthatapp_com https://freesound.org/people/willy_ineedthatapp_com/sounds/167337/, licensed under Creative Commons 0
    var alertSound = new Audio('167337__willy-ineedthatapp-com__pup-alert.mp3');
    
    $("#playAlert").on("click", function () {
    
        playAlert();
    
    });
    
    //This code is used to 'snooze' the proximity alert, by checking the value of a counter variable
    
        var counter = 0;
        //console.log("counter value is: " + counter);
    
        function resetCounter() {
            counter = 0;
            //console.log("resetCounter has been called");
        };
    
        function playAlert() {
            if (counter === 0) {
                    counter = 1;
                    //console.log("Counter value is now: " + counter);
                    alertSound.play();
                    //console.log("Alert sound has been played");
                    setTimeout(resetCounter, 60000);
                    //console.log("Counter reset timer has been set");
                } else if (counter === 1) {
                    //console.log("Alert is on snooze");
                }
        };
    
    //oldX is the x-coordinate from an old position, newX is the updated value. Ditto for oldY and newY
    var direction;
    
    function currentDirection() {
        var oli = $("<h4>");
        if ((newX < oldX) && (newY === oldY)) {
            direction = "E";
            $(oli).text(direction);
            $("#direction").append(oli);
        } else if ((newX > oldX) && (newY === oldY)) {
            direction = "W";
            $(oli).text(direction);
            $("#direction").append(oli);
        } else if ((newX === oldX) && (newY > oldY)) {
            direction = "N";
            $(oli).text(direction);
            $("#direction").append(oli);
        } else if ((newX === oldX) && (newY < oldY)) {
            direction = "S";
            $(oli).text(direction);
            $("#direction").append(oli);
        } else {
            direction = "--"
            $(oli).text(direction);
            $("#direction").append(oli);
        }
    }
    
    //This code looks for changes in the second decimal point, which, on a map, is accurate to 1.1 KM, or .68 miles.
    //Core idea: If user is moving along an axis, a point behind them will have either a higher or lower coordinate value. 
    //I have broken this code into blocks for now, to work it would need to be called as part of a for-loop that looped
    //through an array of coordinates. The for-loop functon can be called using a setInterval.
    
    //console.log(coordinateArray);

var increment = 0;
var alertSound = new Audio('167337__willy-ineedthatapp-com__pup-alert.mp3');

//Create radius takes y coordinates and x coordinates from Firebase...
function createRadius(x, y){
        //Watches your location...
        navigator.geolocation.getCurrentPosition(function(position){
            var currentLat = position.coords.latitude;
            var currentLng = position.coords.longitude;
            //Creates a ~three mile radius...
            var latPlus = x + .00001;
            var latMinus = x - .00001;
            var lngPlus = y + .00001;
            var lngMinus = y - .00001;
            //And lets you know if you stray into that radius.
            if (currentLat > latMinus && currentLat < latPlus) {
                //console.log("Your latitude is proximal to a danger zone.")
                increment = increment + 1;
            } else if (currentLng > lngMinus && currentLng < lngPlus) {
                increment = increment + 1;
                //console.log("Your longitude is proximal to a danger zone.")
            } 
            //console.log("You are proximal to", increment, "ping(s).");
            $("#ping").text(increment);
            if (increment > 0) {
                alertSound.play();
            }
        });
}

//Referencing Firebase and pushing lat lng values to the coordinate array. 
    database.ref().on("child_added", function(results) {
        var xVal = results.val().lat;
        var yVal = results.val().lng;
        var coordObject = {
            xCoordinate: xVal,
            yCoordinate: yVal
        };
        coordinateArray.push(coordObject); 
        // createRadius(xVal, yVal);
    });


    
    function proximityCheck() {
        for (i = 0; i <= coordinateArray.length; i++) {
            if ((direction === "north") && ((newY < coordinateArray[i].yCoordinate) && (newY > (coordinateArray[i].yCoordinate - 0.001))) && (newX === coordinateArray[i].xCoordinate)) {
                playAlert();
            } else if ((direction === "south") && ((newY > coordinateArray[i].yCoordinate) && (newY < (coordinateArray[i].yCoordinate + 0.001))) && (newX === coordinateArray[i].xCoordinate)) {
                playAlert();
            } else if ((direction === "west") && ((newX > coordinateArray[i].xCoordinate) && (newX < (coordinateArray[i].xCoordinate + 0.001))) && (newX === coordinateArray[i].xCoordinate)) {
                playAlert();
            } else if ((direction === "east") && ((newX < coordinateArray[i].xCoordinate) && (newX > (coordinateArray[i].xCoordinate - 0.001))) && (newY === coordinateArray[i].yCoordinate)) {
                playAlert();
            } else if ((direction === "northeast") && ((newY < coordinateArray[i].yCoordinate) && (newY > (coordinateArray[i].yCoordinate - 0.001))) && ((newX < coordinateArray[i].xCoordinate) && (newX > (coordinateArray[i].xCoordinate - 0.001)))) {
                playAlert();
            } else if ((direction === "southeast") && ((newY > coordinateArray[i].yCoordinate) && (newY < (coordinateArray[i].yCoordinate + 0.001))) && ((newX < coordinateArray[i].xCoordinate) && (newX > (coordinateArray[i].xCoordinate - 0.001)))) {
                playAlert();
            } else if ((direction === "southwest") && ((newY > coordinateArray[i].yCoordinate) && (newY < (coordinateArray[i].yCoordinate + 0.001))) && ((newX > coordinateArray[i].xCoordinate) && (newX < (coordinateArray[i].xCoordinate + 0.001)))) {
                playAlert();
            } else if ((direction === "northwest") && ((newY < coordinateArray[i].yCoordinate) && (newY > (coordinateArray[i].yCoordinate - 0.001))) && ((newX > coordinateArray[i].xCoordinate) && (newX < (coordinateArray[i].xCoordinate + 0.001)))) {
                playAlert();
            }
        }
    }

    console.log(coordinateArray);
    
    setInterval(function () {
        newValues();
        currentDirection();
        for (var j = 0; j < coordinateArray.length; j++) {
            createRadius(coordinateArray[j].xCoordinate, coordinateArray[j].yCoordinate);
        }
        //console.log("Pings close to your location: ", increment);
        increment = 0;
    }, 3000);