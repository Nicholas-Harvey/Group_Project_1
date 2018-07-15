var increment = 0;
var alertSound = new Audio('167337__willy-ineedthatapp-com__pup-alert.mp3');

//Create radius takes y coordinates and x coordinates from Firebase...
function createRadius(x, y){
        //Watches your location...
        navigator.geolocation.watchPosition(function(position){
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
            console.log("You are proximal to", increment, "ping(s).");
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
        createRadius(xVal, yVal);
    });

