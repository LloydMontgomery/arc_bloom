var sWidth = $(window).width();
var sHeight = $(window).height();

scope.stageCenter = { x:sWidth/2, y:sHeight/2 };
scope.nRings = 4;
scope.nSegs = 6;
scope.arcWidth = 20;

scope.arcs = [];  // Arcs on Screen
scope.arcPos = []; while(scope.arcPos.push(new Array(scope.nSegs)) < scope.nRings);  // Indexes of arc positions to scope.arcs

scope.stage = new Kinetic.Stage({
	container: 'container',
	width: sWidth,
	height: sHeight
});


/** Keyboard Controls Data **/
scope.curRing = 0;  // The currently selected ring, the one the user can spin


