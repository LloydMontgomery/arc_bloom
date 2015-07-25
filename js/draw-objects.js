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
	fill: 'red',
	strokeWidth: 1,
	angle: 50,
	rotationDeg: 5
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
scope.layer.add(scope.arc2);
scope.layer.add(scope.arc3);
scope.stage.add(scope.layer);










