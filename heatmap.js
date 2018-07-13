var heatmap;

heatmap = new google.maps.visualization.HeatmapLayer({
    data: getPoints(),
    map: map
});

function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap() ? null: map);
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

var coordList = [];

function gatherCoordinates() {
    database.ref().on("child_added", function(results) {
        var latCoord = results.val().lat;
        var lngCoord = results.val().lng;
        var coordPair = new google.maps.LatLng(latCoord, lngCoord);
        coordList.push(coordPair);
    });
}

console.log(coordList);

function getPoints() {
    return coordList;
        //a list of all lat/long pairs in firebase--might need several hundred to actually work--lets find out.//
}