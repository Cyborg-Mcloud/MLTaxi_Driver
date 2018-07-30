	var myMap;
var multiRoute, multiRoute2;
var infoWindow, tempMarker, geocoder;
var dirService, dirRender;
var startMarker, endMarker, thirdMarker, positionMarker;
var startPosListener, endPosListener, selPosListener;
var START_ICON, END_ICON, THIRD_END_ICON;

var city_bounds=new Array();

city_bounds[0]=new Array();
city_bounds[1]=new Array();
city_bounds[0][0]=42.291406;
city_bounds[0][1]=42.624550;
city_bounds[1][0]=42.205379;
city_bounds[1][1]=42.745228;

function initMap(ymaps) 
	{
	myMap = new ymaps.Map("gmap", {center: [MyLat, MyLong], zoom: 14}, {searchControlProvider: 'yandex#search'});
	var card = document.getElementById('pac-card');
    var input = document.getElementById('pac-input');
    var input2 = document.getElementById('pac-input2');
    var input3 = document.getElementById('pac-input3');
    var strictBounds = document.getElementById('strict-bounds-selector');

	
	var suggestView = new ymaps.SuggestView(input,{ boundedBy: city_bounds, results: 7});
	var suggestView1 = new ymaps.SuggestView(input2,{ boundedBy:city_bounds, results: 7});
	var suggestView2 = new ymaps.SuggestView(input3,{ boundedBy: city_bounds, results: 7});

	suggestView.events.add('select', function (e) {
		console.log(e.get('item').value);
		mgeocode(e.get('item').value);
		});
	suggestView1.events.add('select', function (e) {
		console.log(e.get('item').value);
		mgeocode(e.get('item').value);
		});
	suggestView2.events.add('select', function (e) {
		console.log(e.get('item').value);
		mgeocode(e.get('item').value);
		});

	myMap.events.add('click', function (e) {console.log("aqedan "+state); geocodeOnClick(e);   });
	myicon = new ymaps.Placemark([42.24, 42.69], {hintContent: 'ჩემიიკონკა', balloonContent: 'ჩემიიკონკა'}, {iconLayout: 'default#image', iconImageHref: 'resources/pin_start.svg', iconImageSize: [30, 30], iconImageOffset: [-15, 0]  });
	
	carMarker = new ymaps.Placemark([0, 0], {hintContent: 'მანქანა', balloonContent: 'მანქანა'}, {iconLayout: 'default#image', iconImageHref: 'resources/logo.svg', iconImageSize: [30, 30], iconImageOffset: [-15, 0]  });
	myMap.geoObjects.add(carMarker);

	positionMarker = new ymaps.Placemark([42.24, 42.69], {hintContent: 'ჯიპიესი', balloonContent: 'ჯიპიესი'}, {iconLayout: 'default#image', iconImageHref: 'resources/cursor.svg', iconImageSize: [30, 30], iconImageOffset: [-15, 0]  });
	myMap.geoObjects.add(positionMarker);
	setState(0);
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


//	positionMarker.setIcon(symicon);
	}


var state = 0;
var dirsetmap=0;



function calcRoute(from_loc, to_loc, third_loc, third_lata) 
	{
	var start = from_loc.geometry;
	var end = to_loc.geometry;
	last_route=Date.now()

	if (third_lata>0)
		{

		var mtlad_end=third_loc.geometry;

		console.log(mtlad_end);
		myMap.geoObjects.remove(multiRoute);
		myMap.geoObjects.remove(multiRoute2);
		multiRoute2 = new ymaps.multiRouter.MultiRoute({
		referencePoints: [ start, end, mtlad_end ], params: {results: 2} }, {boundsAutoApply: true});
		myMap.geoObjects.add(multiRoute2);
	
		multiRoute2.model.events.add("requestsuccess", function (event) {

			console.log("mroute2: "+multiRoute2.getRoutes().get(0).properties.get('distance').value);
			totalDistance=multiRoute2.getRoutes().get(0).properties.get('distance').value;

			appr_price=parseInt(sit_price[call_class]+(totalDistance/1000)*kmprice[call_class]);
			console.log("distance: "+totalDistance+", appr_price: "+appr_price);
			});

		}
	else
		{
		myMap.geoObjects.remove(multiRoute);
		myMap.geoObjects.remove(multiRoute2);
		multiRoute = new ymaps.multiRouter.MultiRoute({
		referencePoints: [ start, end], params: {results: 2} }, {boundsAutoApply: true});
		myMap.geoObjects.add(multiRoute);
		multiRoute.model.events.add("requestsuccess", function (event) {

			console.log("mroute: "+multiRoute.getRoutes().get(0).properties.get('distance').value);
			totalDistance=multiRoute.getRoutes().get(0).properties.get('distance').value;

			appr_price=parseInt(sit_price[call_class]+(totalDistance/1000)*kmprice[call_class]);
			console.log("distance: "+totalDistance+", appr_price: "+appr_price);
			document.getElementById("dirinfo").innerHTML='<p style="font-size: 20px">'+parseInt(totalDistance/1000)+'კმ / '+parseInt(appr_price) +"-"+parseInt(appr_price+1)+'₾</p>';
			document.getElementById("dirinfo_parent").style.display="block";
			});
		}


	}

