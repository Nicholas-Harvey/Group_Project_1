var coordinateArray = [];

database.ref().on("child_added", function(results) {
    console.log(results.val().lat);
    console.log(results.val().lng);
    var coordObject = {
        xCoordinate: results.val().lat,
        yCoordinate: results.val().lng
    };
    coordinateArray.push(coordObject); 
});

console.log("Logic.js is trying to read:", coordinateArray);
    
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
        $("#location").html("Latitude: " + "<span id='xPos'>" + position.coords.latitude.toFixed(3) + "</span>" +
            "<br>Longitude: " + "<span id='yPos'>" + position.coords.longitude.toFixed(3) + "</span>");
        console.log("test");
    };
    
    getLocation();
    
    var newX = $("#xPos").html();
    console.log("newX is " + newX);
    var oldX;
    var newY = $("#yPos").html();
    console.log("newY is " + newY);
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
    
        alert();
    
    });
    
    //This code is used to 'snooze' the proximity alert, by checking the value of a counter variable
    
        var counter = 0;
        console.log("counter value is: " + counter);
    
        function resetCounter() {
            counter = 0;
            console.log("resetCounter has been called");
        };
    
        function alert() {
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
    
    function currentDirection() {
    
        if ((newX > oldX) && (newY === oldY)) {
            direction = "east";
            $("#direction").html(direction);
            console.log(direction);
        } else if ((newX < oldX) && (newY === oldY)) {
            direction = "west";
            $("#direction").html(direction);
            console.log(direction);
        } else if ((newX === oldX) && (newY > oldY)) {
            direction = "north";
            $("#direction").html(direction);
            console.log(direction);
        } else if ((newX === oldX) && (newY < oldY)) {
            direction = "south";
            $("#direction").html(direction);
            console.log(direction);
        } else if ((newX > oldX) && (newY > oldY)) {
            direction = "northeast";
            $("#direction").html(direction);
            console.log(direction);
        } else if ((newX > oldX) && (newY < oldY)) {
            direction = "southeast";
            $("#direction").html(direction);
            console.log(direction);
        } else if ((newX < oldX) && (newY < oldY)) {
            direction = "southwest";
            $("#direction").html(direction);
            console.log(direction);
        } else if ((newX < oldX) && (newY > oldY)) {
            direction = "northwest";
            $("#direction").html(direction);
            console.log(direction);
        } else {
            direction = "Position has not changed"
            $("#direction").html(direction);
            console.log(direction);
        }
    }
    
    //This code looks for changes in the second decimal point, which, on a map, is accurate to 1.1 KM, or .68 miles.
    //Core idea: If user is moving along an axis, a point behind them will have either a higher or lower coordinate value. 
    //I have broken this code into blocks for now, to work it would need to be called as part of a for-loop that looped
    //through an array of coordinates. The for-loop functon can be called using a setInterval.
    
    console.log(coordinateArray);
    
    function proximityCheck() {
        for (i = 0; i <= coordinateArray.length; i++) {
    
            if ((direction === "north") && ((newY < coordinateArray[i].yCoordinate) && (newY > (coordinateArray[i].yCoordinate - 0.01))) && (newX === coordinateArray[i].xCoordinate)) {
                alert();
            } else if ((direction === "south") && ((newY > coordinateArray[i].yCoordinate) && (newY < (coordinateArray[i].yCoordinate + 0.01))) && (newX === coordinateArray[i].xCoordinate)) {
                alert();
            } else if ((direction === "west") && ((newX > coordinateArray[i].xCoordinate) && (newX < (coordinateArray[i].xCoordinate + 0.01))) && (newX === coordinateArray[i].xCoordinate)) {
                alert();
            } else if ((direction === "east") && ((newX < coordinateArray[i].xCoordinate) && (newX > (coordinateArray[i].xCoordinate - 0.01))) && (newY === coordinateArray[i].yCoordinate)) {
                alert();
            } else if ((direction === "northeast") && ((newY < coordinateArray[i].yCoordinate) && (newY > (coordinateArray[i].yCoordinate - 0.01))) && ((newX < coordinateArray[i].xCoordinate) && (newX > (coordinateArray[i].xCoordinate - 0.01)))) {
                alert();
            } else if ((direction === "southeast") && ((newY > coordinateArray[i].yCoordinate) && (newY < (coordinateArray[i].yCoordinate + 0.01))) && ((newX < coordinateArray[i].xCoordinate) && (newX > (coordinateArray[i].xCoordinate - 0.01)))) {
                alert();
            } else if ((direction === "southwest") && ((newY > coordinateArray[i].yCoordinate) && (newY < (coordinateArray[i].yCoordinate + 0.01))) && ((newX > coordinateArray[i].xCoordinate) && (newX < (coordinateArray[i].xCoordinate + 0.01)))) {
                alert();
            } else if ((direction === "northwest") && ((newY < coordinateArray[i].yCoordinate) && (newY > (coordinateArray[i].yCoordinate - 0.01))) && ((newX > coordinateArray[i].xCoordinate) && (newX < (coordinateArray[i].xCoordinate + 0.01)))) {
                alert();
            }
    
        }
    }
    
    setInterval(function () {
        newValues();
        currentDirection();
        proximityCheck();
    }, 10000);
    