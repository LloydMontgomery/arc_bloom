/** General Global Variables **/
var sWidth = $(window).width();
var sHeight = $(window).height();
scope.stageCenter = { x:sWidth/2, y:sHeight/2 };

/** Game Difficulty Variables **/
scope.nRings = 4;
scope.nSegs = 6;


/** Visual Variables **/
scope.arcWidth = 20;
scope.stage = new Kinetic.Stage({
	container: 'container',
	width: sWidth,
	height: sHeight
});

/** Keyboard Controls Data **/
scope.curRing = 0;  // The currently selected ring, the one the user can spin


/** Game Memory Variables **/
scope.arcs = []; while(scope.arcs.push(new Array(scope.nSegs)) < scope.nRings);  // Indexes of arc positions to scope.arcs
