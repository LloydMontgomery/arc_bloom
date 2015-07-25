var transition = Kinetic.Easings.StrongEaseOut

var tween = new Kinetic.Tween({
	node: scope.arc,
	duration: 1,
	rotation: 125,
	easing: transition
});

var tween3 = new Kinetic.Tween({
	node: scope.arc,
	duration: 1,
	innerRadius: 90,
	outerRadius: 110,
	angle: 50,
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
	}, 1000);

	setTimeout(function(){
		tween3.destroy();
	}, 3000);
	
}
