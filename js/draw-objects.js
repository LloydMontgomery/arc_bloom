sWidth = $(window).width();
sHeight = $(window).height();

scope.stageCenter = { x:sWidth/2, y:sHeight/2 }

scope.stage = new Kinetic.Stage({
	container: 'container',
	width: sWidth,
	height: sHeight
});

/* Setup the background layer */
scope.backgroundLayer = new Kinetic.Layer();
// Draw the circular board
scope.backgroundLayer.add(new Kinetic.Ring({
	x: scope.stageCenter.x,
	y: scope.stageCenter.y,
	innerRadius: 55,
	outerRadius: 205,
	fillRed: 245,
	fillGreen: 245,
	fillBlue: 245
}));
// Draw the rings separating the layers
for (var i = 0; i < 6; i++) {
	scope.backgroundLayer.add(new Kinetic.Ring({
		x: scope.stageCenter.x,
		y: scope.stageCenter.y,
		innerRadius: 55+(30*i),
		outerRadius: 55+(30*i),
		strokeRed:   200,
		strokeGreen: 200,
		strokeBlue:  200,
		strokeWidth: 1,
		fillRed: 230,
		fillGreen: 230,
		fillBlue: 230
	}));
};
// Draw the lines separating the columns
for (var i = 0; i < 6; i++) {
	scope.backgroundLayer.add(new Kinetic.Line({
		points: [
			scope.stageCenter.x+55+55*i,
			scope.stageCenter.y
		],
		x: scope.stageCenter.x,
		y: scope.stageCenter.y,
		innerRadius: 55,
		outerRadius: 205,
		fillRed: 245,
		fillGreen: 245,
		fillBlue: 245
	}));
};

// for (var i = 0; i < 6; i++) {
	// var temp = new Kinetic.Arc({
	// 	x: sWidth/2,
	// 	y: sHeight/2,
	// 	innerRadius: 55,
	// 	outerRadius: 85,
	// 	strokeRed:   200,
	// 	strokeGreen: 200,
	// 	strokeBlue:  200,
	// 	lineCap: 'round',
	// 	strokeWidth: 1,
	// 	angle: 60,
	// 	rotationDeg: (60*i),
	// 	fillRed: 234,
	// 	fillGreen: 234,
	// 	fillBlue: 234
	// });
	// scope.backgroundLayer.add(temp);
// };

scope.stage.add(scope.backgroundLayer);




scope.layer = new Kinetic.Layer();

// Create the memory management system that is a 2D matrix
scope.arcs = [];
for (var i = 0; i < 5; i++) {
	scope.arcs.push([]);
	for (var j = 0; j < 6; j++) {
		if (Math.random() < .8) {
			continue
		};
		scope.arcs[i].push(new Kinetic.Arc({
			x: sWidth/2,
			y: sHeight/2,
			innerRadius: 60 + (i*30),
			outerRadius: 80 + (i*30),
			// stroke: 'black',
			lineCap: 'round',
			// strokeWidth: 1,
			angle: 50,
			rotationDeg: 5 + (60*j),
			fillRed: 0,
			fillGreen: 0,
			fillBlue: 255
		}));
	};
};
for (var i = 0; i < scope.arcs.length; i++) {
	for (var j = 0; j < scope.arcs[i].length; j++) {
		if (scope.arcs[i][j] != null) {
			scope.layer.add(scope.arcs[i][j]);
		};
	};
};

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

scope.stage.add(scope.layer);










