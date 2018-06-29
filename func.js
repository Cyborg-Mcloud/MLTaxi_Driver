function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/** gets a value of a cookie with given name.
 * returns empty string if no cookie is found
 * */
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function getscreenw()
	{	
	var winW = 640, winH = 460;
	if (document.body && document.body.offsetWidth) {
	 winW = document.body.offsetWidth;
	}
	if (document.compatMode=='CSS1Compat' &&
		document.documentElement &&
		document.documentElement.offsetWidth ) {
	 winW = document.documentElement.offsetWidth;
	}
	if (window.innerWidth && window.innerHeight) {
	 winW = window.innerWidth;
	}
	return winW;
	}


function getscreenh()
	{	
	var winW = 640, winH = 460;
	if (document.body && document.body.offsetWidth) {
	 winH = document.body.offsetHeight;
	}
	if (document.compatMode=='CSS1Compat' &&
		document.documentElement &&
		document.documentElement.offsetWidth ) {
	 winH = document.documentElement.offsetHeight;
	}
	if (window.innerWidth && window.innerHeight) {
	 winH = window.innerHeight;
	}
	return winH;
	}

var curint='none';

function checkConnection() 
	{
	var networkState = navigator.connection.type;

	var states = {};
	states[Connection.UNKNOWN]  = 'Unknown';
	states[Connection.ETHERNET] = 'Ethernet';
	states[Connection.WIFI]     = 'WiFi';
	states[Connection.CELL_2G]  = '2G';
	states[Connection.CELL_3G]  = '3G';
	states[Connection.CELL_4G]  = '4G';
	states[Connection.CELL]     = 'generic';
	states[Connection.NONE]     = 'none';
	
	inter= states[networkState];

	curint=inter;
	document.getElementById('erorebi').innerHTML="internet: "+inter;
	}



  function clearWatch() {
        if (watchID != null) {
            navigator.geolocation.clearWatch(watchID);
            watchID = null;
        }
    }

   function onError(error) 
		{
		document.getElementById('erorebi').innerHTML+='code: '    + error.code    + '<Br>' +              'message: ' + error.message + '<br>';
		}


function long2tile(lon,zoom) { return (Math.floor((lon+180)/360*Math.pow(2,zoom))); }
function lat2tile(lat,zoom)  { return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom))); }

function long2pixel(lon,zoom) { return (((lon+180)/360*Math.pow(2,zoom))); }
function lat2pixel(lat,zoom)  { return (((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom))); }


function datvale_pussy(met)
	{
	var tanxa=0;
	if (met<1)
		{
		tanxa=sit_price[call_class];
		}
	else
		{
		met=met-1;
		tanxa=parseInt( (met*kmprice[call_class]+sit_price[call_class])*100 )/100;	
		}
	return tanxa;
	}