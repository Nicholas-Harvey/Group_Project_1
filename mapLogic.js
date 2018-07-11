
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

                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function(position) {
                            var pos = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            };
                                
                            $("#submit").on("click", function(){
                                console.log("It's me.");
                                console.log(pos.lat, pos.lng);
                                var reportMarker = new 
                                google.maps.Marker({
                                    position: {lat: pos.lat, lng: pos.lng},
                                    map: map,
                                    title: "speedTrapReport"
                                });
                            });

                        }, function() {
                            handleLocationError(true, infoWindow, map.getCenter());
                        });


                    } else {
                        handleLocationError(false, infoWindow, map.getCenter());
                    }
                }
                
                function handleLocationError(browserHasGeolocation, infoWindow, pos) {
                    infoWindow.setPosition(pos);
                    infoWindow.setContent(browserHasGeolocation ?              'Error: The Geolocation service failed.' :
                            'Error: Your browser does not support geolocation.');
                    infoWindow.open(map);
                }
