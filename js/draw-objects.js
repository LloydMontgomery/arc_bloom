var stage = new Kinetic.Stage({
	container: 'container',
	width: 578,
	height: 200
});

var layer = new Kinetic.Layer();

var arc = new Kinetic.Arc({
	x: 100,
	y: 100,
	innerRadius: 60,
	outerRadius: 80,
	stroke: 'black',
	lineCap: 'round',
	fill: 'red',
	strokeWidth: 1,
	angle: 60,
	rotationDeg: -120
});

var rect = new Kinetic.Rect({
	x: 100,
	y: 100,
	width: 100,
	height: 50,
	fill: 'green',
	stroke: 'black',
	strokeWidth: 2,
	opacity: 0.2
});

// layer.add(rect);
layer.add(arc);
stage.add(layer);