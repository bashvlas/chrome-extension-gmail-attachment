
	( function () {

		var script = document.createElement( "script" );
		script.src = chrome.extension.getURL( "/js/injected_script.js" );
		document.body.apendChild( script );

	} () );