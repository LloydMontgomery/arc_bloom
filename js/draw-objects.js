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
			strokeRed:   255,
			strokeGreen: 255,
			strokeBlue:  255,
			lineCap: 'round',
			lineJoin: 'round',
			strokeWidth: 1,
			angle: 60,
			rotationDeg: (60*seg),
			fillRed: 234,
			fillGreen: 234,
			fillBlue: 234
		});
		scope.backgroundLayer.add(temp);
	};
};
scope.stage.add(scope.backgroundLayer);


scope.playLayer = new Kinetic.Layer();

/** Create the memory management system that is a 2D matrix **/

// Find the starting positions at random, check for duplicates
var sPos = []
for (var i = 0; i < 4; i++) {
	do { var pos = Math.floor(Math.random() * 6) + 1; }
	while(sPos.indexOf(pos) > -1);
	sPos.push(pos);
};

// Create the initial X objects to be displayed on the screen
for (let i = 0; i < 4; i++) {
	scope.arcs.push(new Kinetic.Shape({
		x: scope.stageCenter.x,
		y: scope.stageCenter.y,
		stroke: 'green',
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
	scope.playLayer.add(scope.arcs[i]);
	scope.arcPos[0][sPos[i]] = i;
};

console.log(scope.arcPos);

// for (var i = 0; i < 5; i++) {
// 	scope.arcs.push([]);
// 	for (var j = 0; j < 6; j++) {
// 		if (Math.random() < .8) {
// 			continue
// 		};
// 		scope.arcs[i].push(new Kinetic.Arc({
// 			x: sWidth/2,
// 			y: sHeight/2,
// 			innerRadius: 60 + (i*30),
// 			outerRadius: 80 + (i*30),
// 			// stroke: 'black',
// 			lineCap: 'round',
// 			// strokeWidth: 1,
// 			angle: 50,
// 			rotationDeg: 5 + (60*j),
// 			fillRed: 0,
// 			fillGreen: 0,
// 			fillBlue: 255
// 		}));
// 	};
// };
// for (var i = 0; i < scope.arcs.length; i++) {
// 	for (var j = 0; j < scope.arcs[i].length; j++) {
// 		if (scope.arcs[i][j] != null) {
// 			scope.layer.add(scope.arcs[i][j]);
// 		};
// 	};
// };

scope.arc = new Kinetic.Arc({
	x: sWidth/2,
	y: sHeight/2,
	innerRadius: 60,
	outerRadius: 80,
	stroke: 'black',
	lineCap: 'round',
	strokeWidth: 1,
	angle: 50,
	rotationDeg: 4,
	fillRed: 0,
	fillGreen: 0,
	fillBlue: 255
});

// scope.layer.add(scope.arc);

scope.stage.add(scope.playLayer);



















// scope.backgroundLayer.add(new Kinetic.Line({
// 	points: [200,200,300,300],
// 	stroke: 'black',
// 	lineCap: 'round',
// 	strokeWidth: 20,
// 	fill: 'black'
// }));






