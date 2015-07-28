'use strict';

/** Global Data initialized in init-data.js **/


/** Setup the background layer **/

scope.backgroundLayer = new Kinetic.Layer();

// Draw the circular board as arc segments
for (var ring = 0; ring < scope.nRings; ring++) {
	for (var seg = 0; seg < 6; seg++) {
		var temp = new Kinetic.Arc({
			x: scope.stageCenter.x,
			y: scope.stageCenter.y,
			innerRadius: 55 + (scope.arcWidth+10)*ring,
			outerRadius: 85 + (scope.arcWidth+10)*ring,
			stroke: 'white',
			lineCap: 'round',
			lineJoin: 'round',
			strokeWidth: 1,
			angle: 60,
			rotationDeg: (60*seg),
			fill: '#eaeaea'
		});
		scope.backgroundLayer.add(temp);
	};
};

// Draw the currently selected row cursor
var cursor = new Kinetic.Ring({
	x: scope.stageCenter.x,
	y: scope.stageCenter.y,
	innerRadius: 55,
	outerRadius: 85,
	fillAlpha: 0,
	stroke: 'black',
	strokeWidth: 1
});
scope.backgroundLayer.add(cursor);

scope.stage.add(scope.backgroundLayer);

scope.playLayer = new Kinetic.Layer();

scope.spawnArcs = function(spawnableSpaces) {

	// Randomly decide how many new pieces to spawn in
	var newArcs = Math.floor(Math.random() * 2) + 2;
	
	var sPos = []  // Starting position array
	for (var i = 0; i < spawnableSpaces.length; i++)
		if (spawnableSpaces[i] == 1)
			if (Math.random() > .6)
				sPos.push(i);
	// There should be at least one spawning every time
	if (sPos.length == 0) {
		for (var i = 0; i < spawnableSpaces.length; i++) {
			if (spawnableSpaces[i] == 1) {
				sPos.push(i);
				break;
			};
		};
	};

	// Create the initial X objects to be displayed on the screen
	for (let i = 0; i < sPos.length; i++) {

		// Generate a new colour for each arc
		if (Math.floor(Math.random() * 2)) {
			var colour = {r:153, g:194, b:153};  // #99C299
		} else {
			var colour = {r:77, g:148, b:77};  // #4d944d
		};
		var colour = {r:77, g:148, b:77};  // #4d944d

		scope.arcs[0][sPos[i]] = (new Kinetic.Shape({
			x: scope.stageCenter.x,
			y: scope.stageCenter.y,
			scaleX: 1,
			scaleY: 1,
			rotation: 0,
			strokeRed: colour.r,
			strokeGreen: colour.g,
			strokeBlue: colour.b,
			strokeWidth: scope.arcWidth,
			lineCap: 'round',
			sceneFunc: function(context) {
				var radius = 70;
				var startAngle = (10+(60*sPos[i]))*(Math.PI/180);
				var endAngle =  (50+(60*sPos[i]))*(Math.PI/180);
				context.beginPath();
				context.arc(0, 0, radius, startAngle, endAngle, false);
				context.fillStrokeShape(this);
			},
		}));
		scope.playLayer.add(scope.arcs[0][sPos[i]]);
	};
};
var spawnableSpaces = [];
var arraySize = scope.nSegs; while(arraySize--) spawnableSpaces.push(1);
scope.spawnArcs(spawnableSpaces);


// scope.arcs[1][0] = (new Kinetic.Shape({
// 	x: scope.stageCenter.x,
// 	y: scope.stageCenter.y,
// 	scaleX: 1.429,
// 	scaleY: 1.429,
// 	rotation: 0,
// 	strokeRed: 77,
// 	strokeGreen: 148,
// 	strokeBlue: 77,	
// 	// strokeRed: 153,
// 	// strokeGreen: 194,
// 	// strokeBlue: 153,
// 	strokeWidth: scope.arcWidth/1.429,
// 	lineCap: 'round',
// 	sceneFunc: function(context) {
// 		var radius = 70;
// 		var startAngle = (10+(60*0))*(Math.PI/180);
// 		var endAngle =  (50+(60*0))*(Math.PI/180);
// 		context.beginPath();
// 		context.arc(0, 0, radius, startAngle, endAngle, false);
// 		context.fillStrokeShape(this);
// 	},
// }));
// scope.playLayer.add(scope.arcs[1][0]);

// console.log(scope.arcs);

scope.stage.add(scope.playLayer);







