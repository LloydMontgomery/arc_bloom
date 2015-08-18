/** General Global Variables **/
var sWidth = $(window).width();
var sHeight = $(window).height();
scope.stageCenter = { x:sWidth/2, y:sHeight/2 };


/** Game Difficulty Variables **/
scope.nRings = 4;
scope.nSegs = 6;
scope.nSpinsLeft = 3;


/** Visual Variables **/
scope.arcWidth = 20;
scope.stage = new Kinetic.Stage({
	container: 'container',
	width: sWidth,
	height: sHeight
});

// scope.colourSpec = ['#f80012', '#3e13af', '#6c006c']; // Original colours, blue and purple are too close together
scope.colourSpec = ['#ff0000', '#0029a3', '#7a00a3']; // more vibrant option

scope.initOp = 0.5;

scope.transition = Kinetic.Easings.StrongEaseOut


/** Keyboard Controls Data **/
scope.curRing = 0;  // The currently selected ring, the one the user can spin


/** Game Memory Variables **/
// All arcs on screen are stored here. Position in the array is relative to the position on the screen
scope.arcs = []; while(scope.arcs.push(new Array(scope.nSegs)) < scope.nRings);  // Indexes of arc positions to scope.arcs

scope.runningTweens = [];

