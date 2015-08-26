// This javascript file is responsible for the map displaying issues.
var geometry = "";
var mainMap, geocoder, markerBounds, home_icon, noormal_icon, user_icon, bounceTimer;
var glasgowUni = new google.maps.LatLng(55.872100, -4.287835);
// This is used temporarily center the map when user input locations / routes.
// var tempCenter = "";

// Hold all markers on map.
var markers = [];
// Hold all infowindows on map.
// var currentInfoWindow = [];
var currentInfoWindow = null;


/**
 * The CenterControl adds a control to the map that recenters the map
 * on Chicago.
 * @constructor
 * @param {!Element} controlDiv
 * @param {!google.maps.Map} map
 * @param {?google.maps.LatLng} center
 */
function CenterControl(controlDiv, map, center) {
  // We set up a variable for this since we're adding event listeners later.
  var control = this;

  // Set the center property upon construction
  control.center_ = center;
  controlDiv.style.clear = 'both';

  // Set CSS for the setCenter control border
  var setCenterUI = document.createElement('div');
  setCenterUI.style.backgroundColor = '#fff';
  setCenterUI.style.border = '8px solid #fff';
  setCenterUI.style.borderRadius = '3px';
  setCenterUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  setCenterUI.style.cursor = 'pointer';
  // setCenterUI.style.float = 'left';
  // setCenterUI.style.marginBottom = '22px';
  // setCenterUI.style.marginLeft = '12px';
  setCenterUI.style.margin = '10px';
  setCenterUI.style.textAlign = 'center';
  setCenterUI.title = 'Click to get your location.';
  controlDiv.appendChild(setCenterUI);


  var locateImg = document.createElement("img");
  locateImg.src = '../static/images/locate.png';
  locateImg.style.width = '20px';
  locateImg.style.height = '20px';
  setCenterUI.appendChild(locateImg);


  // Set CSS for the control border
  var goCenterUI = document.createElement('div');
  goCenterUI.style.backgroundColor = '#fff';
  goCenterUI.style.border = '8px solid #fff';
  goCenterUI.style.borderRadius = '3px';
  goCenterUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  goCenterUI.style.cursor = 'pointer';
  // goCenterUI.style.float = 'left';
  // goCenterUI.style.marginBottom = '22px';
  goCenterUI.style.margin = '10px';
  goCenterUI.style.textAlign = 'center';
  goCenterUI.title = 'Click to clear the markers';
  controlDiv.appendChild(goCenterUI);

  var clearImg = document.createElement("img");
  clearImg.src = '../static/images/reset.png';
  clearImg.style.width = '20px';
  clearImg.style.height = '20px';
  goCenterUI.appendChild(clearImg);

  // Set CSS for the control interior
  // var goCenterText = document.createElement('div');
  // goCenterUI.style.color = 'rgb(25,25,25)';
  // goCenterUI.style.fontFamily = 'Roboto,Arial,sans-serif';
  // goCenterUI.style.fontSize = '16px';
  // goCenterUI.style.lineHeight = '38px';
  // goCenterUI.style.paddingLeft = '5px';
  // goCenterUI.style.paddingRight = '5px';
  // goCenterUI.innerHTML = 'CM';

  // goCenterUI.appendChild(goCenterText);

  // // Set CSS for the control interior
  // var setCenterText = document.createElement('div');
  // setCenterText.style.color = 'rgb(25,25,25)';
  // setCenterText.style.fontFamily = 'Roboto,Arial,sans-serif';
  // setCenterText.style.fontSize = '16px';
  // setCenterText.style.lineHeight = '38px';
  // setCenterText.style.paddingLeft = '5px';
  // setCenterText.style.paddingRight = '5px';
  // setCenterText.innerHTML = 'SC';
  // setCenterUI.appendChild(setCenterText);

  // Setup the click event listener for 'Center':
  // simply set the map to the control's current center property.
  google.maps.event.addDomListener(goCenterUI, 'click', function() {
    // var currentCenter = control.getCenter();
    // map.setCenter(currentCenter);
    clearMarkers();
  });

  // Setup the click event listener for 'Set':
  // Set the control's center to the current Map center.
  google.maps.event.addDomListener(setCenterUI, 'click', function() {
    // var newCenter = map.getCenter();
    // control.setCenter(newCenter);
    geoLocating();
  });

}

/**
 * Define a property to hold the center state.
 * @private
 */
CenterControl.prototype.center_ = null;

/**
 * Gets the map center.
 * @return {?google.maps.LatLng}
 */
CenterControl.prototype.getCenter = function() {
  return this.center_;
};

/**
 * Sets the map center.
 * @param {?google.maps.LatLng} center
 */
CenterControl.prototype.setCenter = function(center) {
  this.center_ = center;
};

// This is the function used to get user's current location.
function geoLocating() {

  // var infoWindow = new google.maps.InfoWindow({map: mainMap});
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      dropMarker(pos, "your location.", user_icon);

      // infoWindow.setPosition(pos);
      // infoWindow.setContent('Location found.');
      mainMap.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, mainMap.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, mainMap.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}





// This funtion is used to spli the data string passed from Django
// The split process is essential and has to be changed from time to time ,because the string comes from databse to 
// here always with some extra changes or data inside mades it complex.
function splitDataString() {

  // Set Timeout is very important because GMap.js should get the data after the data setting by the inner js in html file.
  // setTimeout(function(){

  geometry = $('#geometry').data('info');
  // alert("IN JS geometry: " + geometry);
  // new Messi("IN JS geometry: " + geometry, {title: 'Success Info', titleClass: 'success', center: true, buttons: [{id: 0, label: 'Close', val: 'X'}]});

  // Removing the outer brackets "[...]"
  geometry = geometry.substring(1, geometry.length-1);

  // alert("2 "+geometry);

  // Replacing here is ready for the following split.
  geometry_replaced = geometry.replace(/}, {/g, "}§{");

  // split a whole string into blocks.
  geometry_location_array = geometry_replaced.split("§");

  // Separately send every location, which is in geometry_location_array, into displaying process.
  for (var i = 0; i < geometry_location_array.length; i++) {

    // Getting the length will be helpful later on in removing the braces "{ }"
    var arrayLength = geometry_location_array[i].length;

    // Removing the outer braces "{...}".
    single_location = geometry_location_array[i].substring(1, arrayLength - 1);

    // This step is used to indicate the cut-off within every location info.
    // e.g. 'website':'...'§'name':'...'§ ...
    // and also, replacing is here for the next split.
    single_location = single_location.replace(/', '/g, "'§'");

    // Split every block into entries, each entry with two elements: attr name & value.
    single_location_array = single_location.split("§");

    // //Below is a good testing approach before displaying data: KEEP IT
    // var str="";
    // for(var j=0;j<single_location_array.length;j++){
    //     str += single_location_array[j]+"\n"
    // }
    //   alert("before displaying: "+str);

    // setTimeout(function() {
    //pass all entries in each block into the following function to get a single location array.
    generateSingleLocationArray(single_location_array);
      
    // }, 100)

    // consume some time
    // for(var j=0;j<1000000;j++){}
  }

  // They are might be useful to zoom in / out automatically for the user.
  mainMap.setCenter(new google.maps.LatLng(55.858351, -4.253058));
  mainMap.setZoom(11);
  // mainMap.setCenter(55.858351, -4.253058);
  // center = markerBounds.getCenter();
  // mainMap.fitBounds(markerBounds);
  // mainMap.setCenter(center);
  // mainMap.setZoom(14);
  // mainMap.panToBounds(markerBounds);
  // pre_geometry = geometry;
  // }, 3000);
}

// This function is mainly help to filter each block and fetch each valid <name, value>
// and stored in the new location_array which will be sent to display.
function generateSingleLocationArray(location_array_raw) {
  var location_array = new Array();
  // the count is for helping indexing valid position in location_array
  var count = 0;
  var postcode = "";
  var address = "";
  var locationName = "";

  for (var i = 0; i < location_array_raw.length; i++) {

    // The first index is used to find the position of "u''", which actually 
    // is the null attribute,
    // and the other indexes are for ignoring irrelevant entries
    // which are related to the database and the Django framwork.
    var index = location_array_raw[i].indexOf("u''");
    // Exclude the entry with u'#' inside.
    var index_a = location_array_raw[i].indexOf("u'#'");

    // if (index == -1 && index_a != 9 && index_a != 0 && index_b == -1 && index_c == -1)
    if (index == -1 && index_a == -1) {
      location_array[count] = new Array();

      // below line uses the jQuery to remove the first and last space in a string,
      // and replaced the origin one.
      location_array_raw[i] = $.trim(location_array_raw[i]);
      index = location_array_raw[i].indexOf("':");
      length = location_array_raw[i].length;

      // Following two substring() are for getting every entry's name and the value and
      // then stored into an array for displaying.
      // alert("raw: "+location_array_raw[i]);
      attribute_name = location_array_raw[i].substring(1, index);
      attribute_value = location_array_raw[i].substring(index + 5, length - 1);
      // alert("attribute_name: "+attribute_value);

      // get name for using later on.
      // this is must-have field in all entries.
      if (attribute_name == "name") {
        locationName = attribute_value;
      }
      // get postcode for Geocoding in advance.
      // this is not necessary attribute in all entries.
      if (attribute_name == "postcode") {
        postcode = attribute_value;
      }
      // get address for Geocoding if postcode failed.
      // this is not necessary attribute in all entries.
      if (attribute_name == "address") {
        address = attribute_value;
      }

      location_array[count] = [attribute_name, attribute_value];
      count++;
    } else
      continue;
  }
  // alert("Location_array: "+location_array);
  displayLocations(location_array, postcode, address, locationName);
}

// This function used Geocoding service, adapted from Google map tutorial,
// at https://google-developers.appspot.com/maps/documentation/javascript/examples/geocoding-simple
// usually, the location_array have three pairs at the first 3 postions: name, address, postcode.
function displayLocations(location_array, postcode, address, locationName) {

  var marker;
  var locations = location_array;
  var postcode = postcode;
  var address = address;
  var locationName = locationName;

  // geo address will use postcode to geoCoding, if postcode is unvalid, then address will be used.
  var geoAddress = postcode;

  if ( geoAddress.replace(/\s/g, "" ).length == 0) {
    geoAddress = address;
  }

  // alert("Address: " + geoAddress);
  geocoder.geocode({
    'address': geoAddress
    }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {

      mainMap.setCenter(results[0].geometry.location);
      marker = dropMarker(results[0].geometry.location, locationName, normal_icon);

      // var marker = new google.maps.Marker({
      //   icon: image_icon,
      //   map: mainMap,
      //   position: results[0].geometry.location,
      //   title: "This is " + locationName
      // });
      // markerBounds.extend(results[0].geometry.location);

    } else {
      new Messi('Geocode was not successful for the following reason: ' + status, {title: 'We Ran An Error..', titleClass: 'anim error', center: 'true', buttons: [{id: 0, label: 'Close', val: 'X'}]});
    }

  if(locations.length != 0) {
    generateInfoWindow(locations, locationName, marker);
  }

  });

}


// ************************************************
// The following part is aimed for displaying the information on the locations.
// this content_string is created for holding all informtation about one location.
function generateInfoWindow(locations, locationName, marker) {
    var content_string = '<div id="marker-content">' +
      '<div id="siteNotice">' + '</div>' +
      '<h4 id="firstHeading" class="info-window-heading">' + locationName + '</h4>' +
      '<div id="bodyContent">';

    // This loop is for appending additional information for the content_string
    for (var i = 0; i < locations.length; i++) {
      // alert("info: "+location[i][0]+": "+location[i][1]);
      if(locations[i][0] == "website"){
        content_string += '<p class="info-window-body"><b>' + locations[i][0] + "</b>: <a href="+locations[i][1]+" target='_blank'>" + locations[i][1] + "</a></p>";        
      }
      else if(locations[i][0] == "year"){
        content_string += '<p class="info-window-body"><b>' + locations[i+1][0] + "</b>: " + locations[i+1][1] + ", "+ locations[i+2][1] +", " + locations[i][1] + "</p>";
        i += 2;
      }
      else{
        content_string += '<p class="info-window-body"><b>' + locations[i][0] + "</b>: " + locations[i][1] + "</p>";
      }
    }
    // This is for ending the content_string
    content_string += "</div></div>";

    // create the information windows and adding listener to the marker clicks.
    var infowindow = new google.maps.InfoWindow({
      content: content_string
      // maxWidth: 200
    });


    google.maps.event.addListener(marker, 'click', function() {

      if(currentInfoWindow) {
        currentInfoWindow.close();
      };

      infowindow.open(mainMap, marker);
      // currentInfoWindow.push(infowindow);
      currentInfoWindow = infowindow;
    });
}


// This function is for dropping makers.
// parameters are 1. lat&lng, 2.location's name, 3.the specific image icon.
function dropMarker(position, locationName, image_icon) {
  var newMarker;
  newMarker = new google.maps.Marker({
      icon: image_icon,
      position: position,
      map: mainMap,
      animation: google.maps.Animation.DROP,
      title: "This is " + locationName
    });

  // Click the markers will toggle the markers' Bounce Animation.
  newMarker.addListener('click', function() {

    if (newMarker.getAnimation() !== null) {
      newMarker.setAnimation(null);
    } else {
      setTimeout( function () {
        newMarker.setAnimation(null);
      }, 3500);
      newMarker.setAnimation(google.maps.Animation.BOUNCE);
    }
// 
  });

  // toggleBounce(newMarker));
  markers.push(newMarker);
  return newMarker;
}

// This function is for markers' Bounce Animation.
function toggleBounce(marker) {

}

// This function is for clearing all markers on map.
function clearMarkers() {
    var single_marker;
    // Pop each and set each null.
    while( single_marker = markers.pop() ){
        single_marker.setMap(null);
    }
}

// Close infowindow already opened on map.
function closeInfoWindow() {

  currentInfoWindow.close();

  // var single_infowindow;
  // while( single_infowindow = currentInfoWindow.pop() ){
  //   single_infowindow.close();    
  // }
}

// function drop(){
  // clearMarkers();
  // for (var i = 0; i < neighborhoods.length; i++) {
  //   addMarkerWithTimeout(neighborhoods[i], i * 200);
  // }
// }
// function addMarkerWithTimeout(position, timeout) {
//   window.setTimeout(function() {
//     markers.push(new google.maps.Marker({
//       position: position,
//       map: map,
//       animation: google.maps.Animation.DROP
//     }));
//   }, timeout);
// }
// 
// function clearMarkers() {
//   for (var i = 0; i < markers.length; i++) {
//     markers[i].setMap(null);
//   }
//   markers = [];
// }

function getStyles() {
  
  // Create an array of styles.
  var styles = [
    // {
    //   stylers: [
    //     { hue: "#8f0" },
    //     { saturation: 0 }
    //   ]
    // },{
    //   featureType: "road",
    //   elementType: "geometry",
    //   stylers: [
    //     { lightness: 100 },
    //     { visibility: "simplified" }
    //   ]
    // },{
    //   featureType: "road",
    //   elementType: "labels",
    //   stylers: [
    //     { visibility: "on" }
    //   ]
    // }

    { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#a7a3d2" } ] },
    { "featureType": "landscape.natural", "stylers": [ { "color": "#95CEC2" } ] },
    { "featureType": "landscape.man_made", "stylers": [ { "color": "#ffffe4" } ] },
    { "featureType": "road.arterial", "elementType": "geometry", "stylers": [ { "visibility": "simplified" }, { "color": "#BF9E7E" } ] },
    { "featureType": "road", "elementType": "labels.text", "stylers": [ { "visibility": "off" } ] },
    { "featureType": "poi", "elementType": "labels", "stylers": [ { "visibility": "on" } ] }

  ];

  // Create a new StyledMapType object, passing it the array of styles,
  // as well as the name to be displayed on the map type control.
  var styledMap = new google.maps.StyledMapType(styles,
    {name: "Styled Map"});

  return styledMap;
}


// This fuction is a fundemantal part when using Google map api.
function initialize() {

 // Create a map object, and include the MapTypeId to add
  // to the map type control.
  markerBounds = new google.maps.LatLngBounds();
  geocoder = new google.maps.Geocoder();
  var mapDiv = document.getElementById('map-canvas');
  var mapOptions = {
    zoom: 12,
    center: glasgowUni,

    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    },

    mapTypeControl: true,
    mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_RIGHT
    },

    zoomControl: true,
    zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
        position: google.maps.ControlPosition.RIGHT_CENTER
    },

    streetViewControl: true,
    streetViewControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
    },

    // google.maps.PanControlOptions
    panControl: false
    // ,
    // panControlOptions: {
    //   position: google.maps.ControlPosition.RIGHT_TOP
    // }

  }
  mainMap = new google.maps.Map(mapDiv, mapOptions);

  //Associate the styled map with the MapTypeId and set it to display.
  mainMap.mapTypes.set('map_style', getStyles());
  mainMap.setMapTypeId('map_style');


  normal_icon = '../static/images/normal-marker.png';
  home_icon = '../static/images/home-marker.png';
  user_icon ='../static/images/user-marker.png';
  var marker_glasgowUni = new google.maps.Marker({
    icon: home_icon,
    position: glasgowUni,
    map: mainMap,
    title: "Glasgow University-Main Gate"
  });
  // markerBounds.extend(glasgowUni);

  //// Create the DIV to hold the control and
  // call the CenterControl() constructor passing
  // in this DIV.
  var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, mainMap);

  centerControlDiv.index = 1;
  mainMap.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(centerControlDiv);

  setTimeout(function(){
    $('#map-inputs').show("slow");
  },500);
//   google.maps.event.addListener(marker_glasgowUni, 'mouseover', function() {
//   if (this.getAnimation() == null || typeof this.getAnimation() === 'undefined') {        
       
//       Because of the google maps bug of moving cursor several times over and out of marker
//       causes bounce animation to break - we use small timer before triggering the bounce animation
      
//       clearTimeout(bounceTimer);
      
//       var that = this;
//       bounceTimer = setTimeout(function(){
//            that.setAnimation(google.maps.Animation.BOUNCE);
//       },
//       500);
//   }
// });
    
    // google.maps.event.addListener(marker_glasgowUni, 'mouseout', function() {
    //      if (this.getAnimation() != null) {
    //         this.setAnimation(null);
    //      }
    //      // If we already left marker, no need to bounce when timer is ready
    //      clearTimeout(bounceTimer);
    // });

  // mainMap.data.loadGeoJson('../static/images/Glasgow_Rail_References.json');
google.maps.event.addListener(mainMap, 'click', closeInfoWindow);

}
// google.maps.event.addDomListener(window, 'load', initialize);


// Callback function.
function test(a, b, test2) {
  var c = 0;

  setTimeout(function() {
    var c = a+b;
    var i = 1;

    alert("test1 "+ c);    
  }, 100);

  test2(c);
  // return c;
}

function test2(c) {
  // var c = c;
  alert("test2 "+c);
}

// $("#whats-new-btn").click(function (){
//     var c = test(1,2,test2);
//     // test2(c);
// });

// This jQuery is adding listener for clicking on show map button.
$('#show-map').click(function() {
  // alert();
    $('#alter').fadeOut('fast');
      document.getElementById("alter").setAttribute("id", "map-canvas");
    $('#map-canvas').fadeIn('fast');
    
    initialize();

    setTimeout(function(){
      $('#map-inputs').show("slow");
    },500);
    // var addr = document.getElementById("inputSmall").value;
    // alert(addr);
    // displayLocations([],addr,addr,"Test");
})

$('#map-submit').click(function() {
  var location = $('#location-input').val();
  // alert(location);
  displayLocations([],location,location,location);
})






