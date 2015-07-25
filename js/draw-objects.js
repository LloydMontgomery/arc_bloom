width = $(window).width();
height = $(window).height();

scope.stage = new Kinetic.Stage({
	container: 'container',
	width: width,
	height: height
});

scope.layer = new Kinetic.Layer();

scope.arc = new Kinetic.Arc({
	x: width/2,
	y: height/2,
	innerRadius: 60,
	outerRadius: 80,
	stroke: 'black',
	lineCap: 'round',
	strokeWidth: 1,
	angle: 50,
	rotationDeg: 5,
	fillRed: 0,
	fillGreen: 0,
	fillBlue: 255
});

scope.arc2 = new Kinetic.Arc({
	x: width/2,
	y: height/2,
	innerRadius: 60,
	outerRadius: 80,
	stroke: 'black',
	lineCap: 'round',
	fill: 'red',
	strokeWidth: 1,
	angle: 50,
	rotationDeg: 65
});

// Create the memory management system that is a 2D matrix
scope.arcs = [];
for (var i = 0; i < 5; i++) {
	scope.arcs.push([]);
	for (var j = 0; j < 6; j++) {
		if (Math.random() < .8) {
			continue
		};
		scope.arcs[i].push(new Kinetic.Arc({
			x: width/2,
			y: height/2,
			innerRadius: 60 + (i*30),
			outerRadius: 80 + (i*30),
			stroke: 'black',
			lineCap: 'round',
			strokeWidth: 1,
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

scope.arc3 = new Kinetic.Arc({
	x: width/2,
	y: height/2,
	innerRadius: 90,
	outerRadius: 110,
	stroke: 'black',
	lineCap: 'round',
	fill: 'green',
	strokeWidth: 1,
	angle: 50,
	rotationDeg: 65
});

scope.layer.add(scope.arc);
//scope.layer.add(scope.arc2);
//scope.layer.add(scope.arc3);

scope.stage.add(scope.layer);










