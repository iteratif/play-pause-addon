var self = require("sdk/self");
var tabs = require("sdk/tabs");

var button;
var paused = false;

function onOpen( _tab ) {
  _tab.on( "load", isLoaded );
  _tab.on( "close", isClosed )
}

function isClosed( _tab )
{
	if( _tab.url.indexOf( 'youtube' ) > -1
		&& _tab.url.indexOf( 'watch' ) > -1 )
	{
		button.destroy();
	}
}

function isLoaded( _tab ) {
	if( _tab.url.indexOf( 'youtube' ) > -1
		&& _tab.url.indexOf( 'watch' ) > -1 )
	{
		button = require( "sdk/ui/button/action" ).ActionButton({
			id: "style-tab",
			label: "Style Tab",
			icon: "./pause.png",
			onClick: function() {
				paused = !paused;
				_tab.attach({
					contentScriptFile: [ self.data.url( 'jquery-3.1.0.min.js' ) ],
					contentScript: '$("button.ytp-play-button").trigger("click")'
				});
				button.icon = ( paused ) ? "./play.png" : './pause.png';
			}
		});
	}
}

tabs.on( 'ready', onOpen );