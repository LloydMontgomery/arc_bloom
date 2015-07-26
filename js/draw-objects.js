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

/** Create the memory management system that is a 2D matrix **/

// Find the starting positions at random, check for duplicates
var sPos = []  // Starting position array
for (var i = 0; i < 4; i++) {
	do { var pos = Math.floor(Math.random() * 5); }
	while(sPos.indexOf(pos) > -1);
	sPos.push(pos);
};

// Create the initial X objects to be displayed on the screen
for (let i = 0; i < 4; i++) {
	scope.arcs[0][sPos[i]] = (new Kinetic.Shape({
		x: scope.stageCenter.x,
		y: scope.stageCenter.y,
		scaleX: 1,
		scaleY: 1,
		strokeRed: 153,
		strokeGreen: 194,
		strokeBlue: 153,
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

scope.arcs[1][3] = (new Kinetic.Shape({
	x: scope.stageCenter.x,
	y: scope.stageCenter.y,
	scaleX: 1,
	scaleY: 1,
	strokeRed: 153,
	strokeGreen: 194,
	strokeBlue: 153,
	strokeWidth: scope.arcWidth,
	lineCap: 'round',
	sceneFunc: function(context) {
		var radius = 70*1.429;
		var startAngle = (10+(60*3))*(Math.PI/180);
		var endAngle =  (50+(60*3))*(Math.PI/180);
		context.beginPath();
		context.arc(0, 0, radius, startAngle, endAngle, false);
		context.fillStrokeShape(this);
	},
}));
scope.playLayer.add(scope.arcs[1][3]);

console.log(scope.arcs);

scope.stage.add(scope.playLayer);







