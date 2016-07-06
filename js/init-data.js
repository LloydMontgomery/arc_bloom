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

//scope.greenSpec = ['#99C299', '#4D944D', '#006600', '#004700', '#002900']

// Pastels
scope.redSpec    = ['#fb6671', '#f80012', '#95000b']
scope.blueSpec   = ['#8b71cf', '#3e13af', '#250b69']
scope.purpleSpec = ['#a766a7', '#6c006c', '#410041']

// Pastels close together in shades
// scope.redSpec    = ['#fb6671', '#f80012', '#95000b']
// scope.blueSpec   = ['#8b71cf', '#3e13af', '#250b69']
// scope.purpleSpec = ['#a766a7', '#6c006c', '#410041']

// Original
// scope.redSpec    = ['#b4333d', '#a1000c', '#81000a']
// scope.blueSpec   = ['#50388e', '#240672', '#1d055b']
// scope.purpleSpec = ['#893389', '#6c006c', '#560056']

scope.transition = Kinetic.Easings.StrongEaseOut


/** Keyboard Controls Data **/
scope.curRing = 0;  // The currently selected ring, the one the user can spin


/** Game Memory Variables **/
// All arcs on screen are stored here. Position in the array is relative to the position on the screen
scope.arcs = []; while(scope.arcs.push(new Array(scope.nSegs)) < scope.nRings);  // Indexes of arc positions to scope.arcs

scope.runningTweens = [];

