
var infoWindow, tempMarker, geocoder;
var dirService, dirRender;
var startMarker, endMarker, thirdMarker, positionMarker;
var startPosListener, endPosListener, selPosListener;
var START_ICON, END_ICON, THIRD_END_ICON;
function geocodeLocation(position, infoWindow, markerName) {
    console.log("geocodeLocation")
}

function initMap() 
	{

	console.log("mylat: "+MyLat+", mylong: "+MyLong);
    var position = {lat: MyLat, lng: MyLong};

    mymap = new google.maps.Map(document.getElementById('gmap'), {
        zoom: 16,
        center: position,
        zIndex: 70,
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
    });


console.log("mere");
    dirRender = new google.maps.DirectionsRenderer({suppressMarkers: true});
    dirService = new google.maps.DirectionsService();
    START_ICON = {
        url: "resources/pin_start.svg", // url
        scaledSize: new google.maps.Size(30, 36), // size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(15, 36), // anchor
        ratation: 30
    };
    END_ICON = {
        url: "resources/pin_end.svg", // url
        scaledSize: new google.maps.Size(30, 36), // size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(15, 36), // anchor
        ratation: 30
    };

	THIRD_END_ICON = {
        url: "resources/pin_red.svg", // url
        scaledSize: new google.maps.Size(30, 36), // size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(15, 36), // anchor
        ratation: 30
    };
    var myicon = {
        url: "resources/pin_start.svg", // url
        scaledSize: new google.maps.Size(30, 36), // size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(15, 36), // anchor
        ratation: 30
    };

    var caricon = {
        url: "resources/car.svg", // url
        scaledSize: new google.maps.Size(50, 50), // size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(25, 25) // anchor
    };

	var symicon = {
        url: "arrow.svg", // url
        scaledSize: new google.maps.Size(50, 50), // size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(25, 25), // anchor
		rotation:mrot
    };

	//symicon={
	//			path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
//				fillColor: '#000000',
//				strokeColor: '#000000',
//				strokeWeight: 6,
//				scale: 10,
//				rotation: mrot
//				}

//    var gpsIcon = {
//        url: "resources/images/Clustericon.svg", // url
//        scaledSize: new google.maps.Size(30, 30), // size
//        origin: new google.maps.Point(0, 0), // origin
//        anchor: new google.maps.Point(29, 29) // anchor
//    };
	console.log("icons loaded");
    startMarker = new google.maps.Marker({
        icon: START_ICON,
        map: mymap
    });

    endMarker = new google.maps.Marker({
        icon: END_ICON, map: mymap
    });

	thirdMarker = new google.maps.Marker({
        icon: THIRD_END_ICON, map: mymap
    });
    positionMarker = new google.maps.Marker({
        position: position,
        map: mymap,
        icon: symicon,
        optimized: false
    });

		


    tempMarker = new google.maps.Marker();
	console.log("markers placed");


   dirRender = new google.maps.DirectionsRenderer({suppressMarkers: true});
    dirService = new google.maps.DirectionsService();

    var strictBounds = document.getElementById('strict-bounds-selector');

   

}



function handleOrientation(event) 
	{
	console.log(event);
	var absolute = event.absolute;
	var alpha    = event.alpha;
	var beta     = event.beta;
	var gamma    = event.gamma;

	console.log("orientation alpha: "+alpha+" , heading: "+MyHead);
	
	if (MyHead!=null && MyHead>0)
		{
		rotate_marker(MyHead);
		}
	else
		{
		mrot=360-(alpha-50);
		if (mrot>360){mrot=mrot-360;}
		if (mrot<0){mrot=mrot+360;}
		//rotate_marker(mrot);
		}
	}

function rotate_marker(kutxe)
	{
	if (MyHead>0)
		{
		kutxe=MyHead;
		}
	//document.getElementById("stat_but").innerHTML=kutxe;
	console.log("rotate marker: "+kutxe+" Myhead=" +MyHead);

 symicon = {
        url: "arrow.svg", // url
        scaledSize: new google.maps.Size(50, 50), // size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(25, 25), // anchor
		rotation:kutxe
    };

//symicon={
//	path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
//	fillColor: '#000000',
//	strokeColor: '#000000',
//	strokeWeight: 5,
//	scale: 10,
//	rotation: kutxe
//	}
	positionMarker.setIcon(symicon);
	}
function geocodeOnClick(e) 
	{


	}

var state = 0;
const SWITCH_TEXTS = ['დასაწყისის არჩევა', 'დანიშნულების არჩევა', 'თავიდან არჩევა'];

function setState(newState)
	{
	
	//	calcRoute(startMarker.getPosition(), endMarker.getPosition(), dirService, dirRender);
	
	}

function switchState() {
    if (state === 1 && (startMarker.getPosition() === undefined || endMarker.getPosition() === undefined)) {
//        setState(0);
        return;
    }
    //setState((state + 1) % 3);

}

function setLocation(marker, target) {
    target.setPosition(marker.getPosition());
    mymappanTo(target.getPosition());

    if (marker === tempMarker || marker === positionMarker) {
        switchState();
        marker.setMap(null);
    }
}

function chooseLocation(curstate) 
	{
	if (curstate==0)
		{

		}
	}

function getPosition(loc) {
    return {
        lat: loc.lat(),
        lng: loc.lng()
    }
}
var dirsetmap=0;
function calcRoute(from_loc, to_loc, directionsService, directionsDisplay, third_loc, third_lata) {
    var start = from_loc;
    var end = to_loc;
	last_route=Date.now()

	if (third_lata>0)
		{
		var waypts = [];
		 waypts.push({
              location: end,
              stopover: true
            });
	

		var request = {
			origin: start,
			destination: third_loc,
			waypoints: waypts,
			optimizeWaypoints: true,
			travelMode: google.maps.TravelMode.DRIVING,
			unitSystem:google.maps.UnitSystem.METRIC
			};

		}
	else
		{
		var request = {
			origin: start,
			destination: end,
			travelMode: google.maps.TravelMode.DRIVING,
			unitSystem:google.maps.UnitSystem.METRIC
			};
		}


    directionsService.route(request, function (response, status) 
		{
        if (status === google.maps.DirectionsStatus.OK) {
            var route = response.routes[0].legs[0];
          //  addMarker(startMarker, mymap, getPosition(route.start_location), mymapgetBounds());
           // addMarker(endMarker, mymap, getPosition(route.end_location), mymapgetBounds());
            directionsDisplay.setDirections(response);
			if (dirsetmap==0)
				{
				directionsDisplay.setMap(mymap); dirsetmap=1; 
				}

			//if (myself==1)
			//	{
				mymap.panTo(positionMarker.getPosition());
			//	}

        } else {
        //    addMarkers(mymap, [from_loc, to_loc], mymapgetBounds());
        }
    });
}

function addMarkers(map, markers, bounds) {
    // Loop through our array of markers & place each one on the map

    addAndGetMarker(map, markers[0], bounds, 'A');
    addAndGetMarker(map, markers[1], bounds, 'B');
}

function addMarker(marker, map, position) {
    var bounds = mymapgetBounds();
    bounds.extend(position);
    marker.setPosition(position);
    marker.setMap(map);
 //   mymapfitBounds(bounds);
}

function addAndGetMarker(map, position, bounds, label, icon) 
	{
    console.log("addAndGetMarker: "+position);
    bounds.extend(position);
    var marker = new google.maps.Marker({
        position: {lat: position['lat'], lng: position['lng']},
        map: map
    });
    if (label !== undefined) marker.setLabel(label);
    if (icon !== undefined) marker.setIcon(icon);
    console.log("addAndGetMarker: "+marker.position);
    marker.addListener('click', function () {
        mymapsetOptions({zoom: mymapzoom + 2, center: position});
    });
    // Automatically center the map fitting all markers on the screen
   // mymapfitBounds(bounds);

}



//  mapTypeId: 'satellite',