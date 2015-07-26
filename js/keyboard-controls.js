window.addEventListener("keydown", function(e) {
	// space and arrow keys
	if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
		e.preventDefault();

		// If the user sends inputs too fast, the old tweens will need to be finished
		for (var i = 0; i < scope.runningTweens.length; i++) {
			scope.runningTweens[i].finish();
		};
		scope.runningTweens = [];
		scope.playLayer.draw();

		
		switch(e.which) {
			case 38:  // UP Arrow Key
				break
			case 40:  // DOWN Arrow Key
				break;
			case 37:  // LEFT Arrow Key
				rotateArcs('counterClockwise');
				break;
			case 39:  // RIGHT Arrow Key
				rotateArcs('clockwise');
				break;
		};
		//console.log(e.which)
		console.log(scope.arcs);
	};
}, false);

function rotateArcs(direction) {
	for (var seg = 0; seg < scope.nSegs; seg++) {
		if (scope.arcs[scope.curRing][seg] != null) {

			// Grab the previous rotation of the arc
			var lastRotation = scope.arcs[scope.curRing][seg].attrs.rotation;
			// It could be 'undefined' so check and convert to 0
			if (lastRotation == null) {lastRotation = 0}

			if (direction == 'clockwise') {
				var newRotation = lastRotation + 60;
			} else {  // direction == 'counterClockwise'
				var newRotation = lastRotation - 60;
			};

			scope.runningTweens.push(new Kinetic.Tween({
				node: scope.arcs[scope.curRing][seg],
				duration: .5,
				rotation: newRotation,
				easing: transition
			}).play());
		};
	};

	// Update arc memory
	if (direction == 'clockwise') {
		var save = scope.arcs[scope.curRing][scope.nSegs-1]  // Save the last arc
		for (var seg = scope.nSegs-2; seg >= 0; seg--) {  // Move all arcs clockwise
			scope.arcs[scope.curRing][seg+1] = scope.arcs[scope.curRing][seg];
		};
		scope.arcs[scope.curRing][0] = save;  // Put the last arc in position 1
	} else {  // direction == 'counterClockwise'
		var save = scope.arcs[scope.curRing][0]  // Save the first arc
		for (var seg = 1; seg < scope.nSegs; seg++) {  // Move all arcs clockwise
			scope.arcs[scope.curRing][seg-1] = scope.arcs[scope.curRing][seg];
		};
		scope.arcs[scope.curRing][scope.nSegs-1] = save;  // Put the last arc in position 1
	}
};
