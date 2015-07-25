var transition = Kinetic.Easings.StrongEaseOut

var tween = new Kinetic.Tween({
	node: scope.arc,
	duration: 1,
	rotation: 120,
	easing: transition
});

var tween2 = new Kinetic.Tween({
	node: scope.arc2,
	duration: 1,
	rotation: 180
});

var tween3 = new Kinetic.Tween({
	node: scope.arc,
	duration: 1,
	innerRadius: 90,
	outerRadius: 110,
	angle: 60,
	fillRed: 255,
	fillGreen: 0,
	fillBlue: 0,
	easing: transition
});

function activate() {
	console.log("Activate")
	console.log(tween.node.attrs.rotation)
	tween.play();
	//tween2.play();

	setTimeout(function(){ 
		//console.log(tween.node.attrs.rotation)
		//tween2.reverse();
		tween3.play();
	}, 2000);

	// setTimeout(function(){
	// 	console.log(scope.arc.attrs)
	// }, 3000);
	
}
