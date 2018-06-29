const EXPIRE_DAYS = 90;

const COOKIE_NAMES = {
    user: 'MyUser',
    password: 'MyPass',
    zoom: 'MyZoom',
    lat: 'WLat',
    lng: 'WLon',
    id: 'LoginId',
    tel: 'Tel_n',
	myid: 'myid'
};


function setCookie_e(cname, cval) {
    setCookie(cname, cval, EXPIRE_DAYS);
}
function WriteData() {
    setCookie_e(COOKIE_NAMES.user, MyUser);
    setCookie_e(COOKIE_NAMES.password, MyPass);
    setCookie_e(COOKIE_NAMES.zoom, MyZoom);
    setCookie_e(COOKIE_NAMES.lat, wlat);
    setCookie_e(COOKIE_NAMES.lng, wlon);
    setCookie_e(COOKIE_NAMES.id, myloginid);
    setCookie_e(COOKIE_NAMES.tel, mytel);
    setCookie_e(COOKIE_NAMES.myid, myid);

	
	console.log("writing: "+MyUser+ " - "+MyPass+ " - "+MyZoom+ " - "+wlat+ " - "+wlon+ " - "+myloginid+ " - "+mytel+ " - "+myid);
    // window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotfswrite, fail);
}
function ReadData() 
	{
    MyUser = getCookie(COOKIE_NAMES.user);
    MyPass = getCookie(COOKIE_NAMES.password);
    MyZoom = getCookie(COOKIE_NAMES.zoom);
    wlat = getCookie(COOKIE_NAMES.lat);
    wlon = getCookie(COOKIE_NAMES.lng);
    myloginid = getCookie(COOKIE_NAMES.id);
    mytel = getCookie(COOKIE_NAMES.tel);
    myid = getCookie(COOKIE_NAMES.myid);
	console.log("reading: "+MyUser+ " - "+MyPass+ " - "+MyZoom+ " - "+wlat+ " - "+wlon+ " - "+myloginid+ " - "+mytel+ " - "+myid);
	}


