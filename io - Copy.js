
function WriteData()
	{
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotfswrite, fail);
	}

function ReadData()
	{
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotfsread, fail);
	}
function gotfswrite(fileSystem) 
	{
	fileSystem.root.getFile("mydriver/locdata.txt", {create: true, exclusive: false}, gotFileEntry, fail);
	}

function gotfsread(fileSystem)
	{
	fileSystem.root.getFile("mydriver/locdata.txt", null, gotFileEntry2, fail2);
	}

function gotFileEntry(fileEntry) 
	{
	fileEntry.createWriter(gotFileWriter, fail);
	}

function gotFileWriter(writer) 
	{
	writer.write(MyUser+";"+MyPass+";"+MyZoom+";"+wlon+";"+wlat+";"+myid);

	}

function fail(error)
	{
	alert("error: "+error.code);
	}



function gotFileEntry2(fileEntry) 
	{
	fileEntry.file(gotFile, fail);
	}

function gotFile(file)
	{
	readAsText(file);
	}

function readAsText(file) 
	{
	var reader = new FileReader();
	reader.onloadend = function(evt) 
		{
		var myData =evt.target.result;
		a=myData.split(";");
		MyUser=a[0];
		MyPass=a[1];
		MyZoom=Math.floor(a[2]);
		if (a.length>3)
			{
			wlon=a[3];
			wlat=a[4];
			setmypos();
			}

		if (a.length>5)
			{
			myid=a[5];
			}

		document.getElementById("myname").value=MyUser;
		document.getElementById("mypass").value=MyPass;
		console.log("data read finished");
		};
	reader.readAsText(file);
	}

function fail2(evt) 
	{
	alert(evt.target.error.code);
	}

function checkIfFileExists(path)
	{
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){fileSystem.root.getDirectory("mydriver", {create: true, exclusive: false}, fileExists, fileDoesNotExist); } , getFSFail); 
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){fileSystem.root.getDirectory("mydriver/maps", {create: true, exclusive: false}, fileExists, fileDoesNotExist); } , getFSFail); 
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){fileSystem.root.getDirectory("mydriver/maps/1", {create: true, exclusive: false}, fileExists, fileDoesNotExist); } , getFSFail); 
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){fileSystem.root.getDirectory("mydriver/maps/2", {create: true, exclusive: false}, fileExists, fileDoesNotExist); } , getFSFail); 
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){fileSystem.root.getDirectory("mydriver/maps/3", {create: true, exclusive: false}, fileExists, fileDoesNotExist); } , getFSFail); 
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){fileSystem.root.getDirectory("mydriver/maps/4", {create: true, exclusive: false}, fileExists, fileDoesNotExist); } , getFSFail); 
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){fileSystem.root.getDirectory("mydriver/maps/5", {create: true, exclusive: false}, fileExists, fileDoesNotExist); } , getFSFail); 
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){fileSystem.root.getDirectory("mydriver/maps/6", {create: true, exclusive: false}, fileExists, fileDoesNotExist); } , getFSFail); 
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){fileSystem.root.getDirectory("mydriver/maps/7", {create: true, exclusive: false}, fileExists, fileDoesNotExist); } , getFSFail); 
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){fileSystem.root.getDirectory("mydriver/maps/8", {create: true, exclusive: false}, fileExists, fileDoesNotExist); } , getFSFail); 
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){fileSystem.root.getDirectory("mydriver/maps/9", {create: true, exclusive: false}, fileExists, fileDoesNotExist); } , getFSFail); 
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){fileSystem.root.getDirectory("mydriver/maps/10", {create: true, exclusive: false}, fileExists, fileDoesNotExist); } , getFSFail); 
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){fileSystem.root.getDirectory("mydriver/maps/dummy.html", {create: true, exclusive: false}, fileExists, fileDoesNotExist); } , getFSFail); 
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){fileSystem.root.getFile("mydriver/"+path, { create: false }, fileExists_main, fileDoesNotExist_main);}, getFSFail); 
//window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){ window.resolveLocalFileSystemURL("file:///storage/emulated/0/mydriver/" + path, fileExists1, fileDoesNotExist1);}, getFSFail); 


	}


function checktile(fileName)
	{
	console.log("checking file: "+fileName);
	fileName="file:///storage/emulated/0/mydriver/maps/"+fileName;
    var http = new XMLHttpRequest();
    http.open('HEAD', fileName, false);
    http.send(null);
	console.log("file: "+fileName+" status: "+http.status );
    return (http.status != 404);
	}

function checktile2(path)
	{
	var reader = new FileReader();
	reader.onloadend = function(evt) 
		{
		if(evt.target.result == null) 
			{
			tilef=0;
			return false;
		   // If you receive a null value the file doesn't exists
			} 
		else 
			{
			tilef=1;
			return true;
	// Otherwise the file exists
			}         
		};

	reader.readAsDataURL("mydriver/maps/"+path); 
	}

function checktile3(path)
	{

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){fileSystem.root.getFile("mydriver/maps/"+path, { create: false }, tilefound, notile);}, getFSFail); 
//	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){fileSystem.root.getFile("mydriver/maps/"+path, { create: false }, function(){console.log("loading image: "+path); document.getElementById("img_"+i+"-"+ii).src="file:///storage/emulated/0/mydriver/maps/"+path;}, function(){console.log("downloading tile: "+smap+"/"+szoom+"_"+A+"_"+B+" : "+i+" | "+ii);downtile(smap, szoom, A, B, i, ii,1);});}, getFSFail); 

	}

function tilefound(fileEntry)
	{
	tilef=1;
	check_complete=1;
	}
function notile()
	{
	tilef=0;
	check_complete=1;
	}

function fileExists(fileEntry)
	{
//		console.log("aris!");
//	dataex=1;
	}
function fileDoesNotExist()
	{
//		console.log("ar arsebobda");
//    dataex=0;
	}


function fileExists_main(fileEntry)
	{
		console.log("aris faili!");

	dataex=1;
			ReadData();
	}
function fileDoesNotExist_main()
	{
	console.log("ar arsebobda");
		myid=Math.floor(Math.random()*100000000);
		
		WriteData();

    dataex=0;
	}

function getFSFail(evt)
	{
    console.log("shit error");
	}



