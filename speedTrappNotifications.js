// Danger Zone = an area where your current speed must decelerate at a rate that is faster than 15fps. These will include: drops in the speed limit,
// unexpected traffic along the way, construction perhaps

// Notifications that we need for the user interface.

// A notification that there are speed traps along the way of the route
// This notification should tell the user the location of the traps as well as how many traps there are

// A notification that tells the user about unexpected traffic along the route, this is to be implemented
// when the traffic is slow enough that deceleration speed violates the safety of protocol of 15 fps deceleration

// Notifications that tell the user when they are approaching a danger zone and how far away it is.
// This will tell the user to consider reducing speed within one mile of the danger zones

// Simple Warning Icon

function SpeedTrap(){
    $("h1").append("<i class='fas fa-tachometer-alt' style='font-size:48px; color: red'></i>");
    $("h1").append("<p>Speed trap reported along route (or within vicinity, depending on how we decide to go about this)</p>");
};
$(document).on("click", "#warning-button", function(){
    console.log("warning is running")
    $("h1").append("<i class='fas fa-tachometer-alt' style='font-size:48px; color: red'></i>");
    $("h1").append("<p>Speed trap reported along route (or within vicinity, depending on how we decide to go about this)</p>");
    speedTrap();
});

// Construction Icon
$(document).on("click", "#construction-button", function(){
    console.log("construction is running")
    $("h2").append("<i class='material-icons' style='font-size:48px'>build</i>  <i class='fas fa-toolbox' style='font-size:48px'></i>  <i class='fas fa-screwdriver'style='font-size:48px'></i>");
    $("h2").append("<p>Construction reported along route (or within vicinity, depending on how we decide to go about this)</p>");
});

$(document).on("click", "#traffic-button", function(){
    console.log("traffic is running")
    $("h3").append("<i class='fa fa-car' style='font-size:48px; color: red'></i>");
    $("h3").append("<p>Significant traffic reported along route (or within vicinity, depending on how we decide to go about this)</p>");
});

$(document).on("click", "#town-button", function(){
    console.log("town is running")
    $("h4").append("<i class='material-icons' style='font-size:48px'>store_mall_directory</i>");
    $("h4").append("<p>Entering Town from Highway, reduce speed</p>");
    
});
