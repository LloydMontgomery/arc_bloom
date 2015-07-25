
var tween = new Kinetic.Tween({
	node: scope.arc,
	duration: 1,
	rotation: 120,

});

var tween2 = new Kinetic.Tween({
	node: scope.arc2,
	duration: 1,
	rotation: 180,

});

// start tween after 2 seconds
setTimeout(function() {
	tween.play();
	tween2.play();
}, 2000);