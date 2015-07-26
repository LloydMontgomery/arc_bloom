'use strict';
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
			case 32:  // SPACE Key
				arcBloom();
				break;
		};
		//console.log(e.which)
		//console.log(scope.arcs);
	};
}, false);

function rotateArcs(direction) {

	// Create the tweens to move the arcs
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
	};
};

function arcBloom() {

	// Create the tweens to move the arcs
	for (let seg = 0; seg < scope.nSegs; seg++) {

		/** Check all rings in a segment for bloom-movement decision **/

		// 
		var segArcColours = new Array(scope.nRings);
		for (var ring = 0; ring < scope.nRings; ring++) {
			if (scope.arcs[ring][seg] != null) {
				segArcColours[ring] = scope.rgbToHex(scope.arcs[ring][seg].attrs.strokeRed,
													 scope.arcs[ring][seg].attrs.strokeGreen,
													 scope.arcs[ring][seg].attrs.strokeBlue)
			};
		};
		console.log(segArcColours);

		for (let ring = segArcColours.length-1; ring > 0; ring--) {

			// Check if two arcs need to merge & increase colour
			if (segArcColours[ring] != null && segArcColours[ring] == segArcColours[ring-1]) {
				//console.log(segArcColours[ring] + " " + segArcColours[ring-1])

				var newColour = scope.nextColour(segArcColours[ring]);
				console.log(newColour);
				var newRgb = scope.hexToRgb(newColour);
				var scale = scope.scale(ring);

				// Start the tween to merge the arcs
				scope.runningTweens.push(new Kinetic.Tween({
					node: scope.arcs[ring-1][seg],
					duration: .5,
					scaleX: scale,
					scaleY: scale,
					strokeRed: newRgb.r,
					strokeGreen: newRgb.g,
					strokeBlue: newRgb.b,
					strokeWidth: scope.arcWidth/scale,
					easing: transition
				}).play());

				// Start the tween to remove one of the arcs
				scope.runningTweens.push(new Kinetic.Tween({
					node: scope.arcs[ring][seg],
					duration: .5,
					opacity: 0,
					easing: transition
				}).play());
			};
			
		};
		

		// if (scope.arcs[scope.curRing][seg] != null) {
		// 	var lastScale = scope.arcs[0][seg].attrs.scaleX;

		// 	// Set the new scale based on old scale
		// 	var newScale = 1;
		// 	switch(lastScale) {
		// 		case 1:
		// 			newScale = 1.429;
		// 			break;
		// 		case 1.429:
		// 			newScale = 1.857;
		// 			break;
		// 		case 1.857:
		// 			newScale = 2.286;
		// 			break
		// 		case 2.286:
		// 			newScale = 2.286;
		// 			break;
		// 	};

		// 	scope.runningTweens.push(new Kinetic.Tween({
		// 		node: scope.arcs[scope.curRing][seg],
		// 		duration: .5,
		// 		scaleX: newScale,
		// 		scaleY: newScale,
		// 		strokeWidth: scope.arcWidth/newScale,
		// 		easing: transition
		// 	}).play());
		// };
	};

	// Update arc memory
	// for (var i = 0; i < Things.length; i++) {
	// 	Things[i]
	// };
};























