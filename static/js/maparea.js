// This is another javascript file for setting the tag cloud.

// Below are the functions for setting the tag cloud on the home page.
function prepareTagCloud() {
	try {
  		TagCanvas.Start('tagcloud-canvas');
    } catch(e) {
      // something went wrong, hide the canvas container
      document.getElementById('tagsCanvasContainer').style.display = 'none';
    }
}

function settingTagCloud() {
	if( ! $('#tagcloud-canvas').tagcanvas({
     // textColour : '#FF66CC',
     textColour : '#ff99ff',
     textHeight : 20,
     // shadow : '#ADFF85',
     // shadowBlur : 1,
     // outlineThickness : 1,
     initial : [0.8,-0.3],
     minSpeed : 0.01,
     maxSpeed : 0.03,

     outlineMethod : 'colour',
     // depth : 0.75,
     // wheelZoom : false,
     // zoom : 1
     reverse : true
   })) {
     // TagCanvas failed to load
     $('#tagsCanvasContainer').hide();
   }
   // your other jQuery stuff here...
}

$('#tag-fun-btn').click(function() {
	$('#tagcloud-canvas').tagcanvas("tagtofront", {id: "tag1", active: true});
	// $('#tagcloud-canvas').tagcanvas("rotatetag", {id: "tag1", lat: 30, lng: -45});
	// .tagcanvas("setspeed", [2, -2]);
})