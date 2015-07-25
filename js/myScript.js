// var canvas = document.getElementById('myCanvas');
// var ctx = canvas.getContext('2d');

function drawCurve() {
	var x = canvas.width / 2;
	var y = canvas.height / 2;
	var radius = 75;
	var startAngle = 1.1 * Math.PI;
	var endAngle = 1.9 * Math.PI;
	var counterClockwise = false;

	ctx.beginPath();
	ctx.arc(x, y, radius, startAngle, endAngle, counterClockwise);
	ctx.lineWidth = 15;

	// line color
	ctx.strokeStyle = 'black';
	ctx.lineCap = 'round';
	ctx.stroke();
}
//drawCurve();

function moveCurve() {
	var x = canvas.width / 2;
	var y = canvas.height / 2;
	var radius = 100;
	var startAngle = 1.1 * Math.PI;
	var endAngle = 1.9 * Math.PI;
	var counterClockwise = false;

	ctx.beginPath();
	ctx.arc(x, y, radius, startAngle, endAngle, counterClockwise);
	ctx.lineWidth = 15;

	// line color
	ctx.strokeStyle = 'black';
	ctx.lineCap = 'round';
	ctx.stroke();
}



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

var tween = new Kinetic.Tween({
node: arc,
duration: 1,
x: 400,
y: 30,
rotation: 360,
opacity: 1,
strokeWidth: 6,
scaleX: 1.5
});

// start tween after 2 seconds
// setTimeout(function() {
// tween.play();
// }, 2000);
