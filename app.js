navigator.geolocation.getCurrentPosition(function(position) {
    $("#startpoint").val(position.coords.latitude);
    $("#endpoint").val(position.coords.longitude);
});

var yetAnotherMarker = new google.maps.Marker({
    position: {lat: 39.5792, lng: -105.9347},
    map: getMap, 
    title: 'Denver'
});
