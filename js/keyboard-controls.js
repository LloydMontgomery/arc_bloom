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
				changeSelectedRing('out');
				break
			case 40:  // DOWN Arrow Key
				changeSelectedRing('in');
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

		/** Check all rings in a segment for bloom-movement decision & build information **/
		var arcBloomSegInfo = buildArcBloomSegInfo(seg);

		// Now that we have the bloom information, execute it as tweens
		for (let ring = arcBloomSegInfo.length-1; ring >= 0 ; ring--) {
			if (arcBloomSegInfo[ring]['node'] == null)
				continue

			var scale = scope.scale(arcBloomSegInfo[ring]['moveTo']);
			var opacity = arcBloomSegInfo[ring]['opacity'];
			var newRgb = scope.hexToRgb(arcBloomSegInfo[ring]['colour']);

			var newRing = ring;
			if (scope.arcs[ring][seg].scaleX() != scale) {
				newRing = arcBloomSegInfo[ring]['moveTo']
				scope.arcs[newRing][seg] = scope.arcs[ring][seg];
				scope.arcs[ring][seg] = null;
			};

			// Update arc memory if the arc moves rings
			scope.runningTweens.push(new Kinetic.Tween({
				node: scope.arcs[newRing][seg],
				duration: .5,
				scaleX: scale,
				scaleY: scale,
				strokeRed: newRgb.r,
				strokeGreen: newRgb.g,
				strokeBlue: newRgb.b,
				opacity: opacity,
				strokeWidth: scope.arcWidth/scale,
				easing: transition
			}).play());
		};
	};
	
};

function showArcMemory() {
	// console.log(scope.arcs);
}


function buildArcBloomSegInfo(seg) {

	// Inilialize the arcBloomSegInfo to be empty objects
	var arcBloomSegInfo = [];
	var arraySize = scope.nRings; while(arraySize--) arcBloomSegInfo.push({});

	// First pass over segment is out-to-in to check for arcs that need to merge
	var segArcColours = [];
	for (var ring = 0; ring < scope.nRings; ring++) {
		segArcColours.push({ colour:'', node:scope.arcs[ring][seg]});

		if (scope.arcs[ring][seg] != null) {
			segArcColours[ring]['colour'] = scope.rgbToHex(scope.arcs[ring][seg].attrs.strokeRed,
												 scope.arcs[ring][seg].attrs.strokeGreen,
												 scope.arcs[ring][seg].attrs.strokeBlue);
		};
	};

	// Combine & move all possible arcs in the set
	for (var ring = segArcColours.length-1; ring > 0; ring--) {

		if (segArcColours[ring]['node'] != null) {  // If there is anything in that spot

			// Search to see if another arc can combine with it
			for (var ring2 = ring-1; ring2 >= 0; ring2--) {

				if (segArcColours[ring2]['node'] != null) {  // Then we have found another arc, stop here

					if (segArcColours[ring]['colour'] == segArcColours[ring2]['colour']) {  // If it is the same colour

						var nodePos1 = nodePosInDictList(segArcColours[ring2]['node'], arcBloomSegInfo);
						if (nodePos1 == -1)  // If it's not already in the list . . .
							nodePos1 = ring2;  // Just use the position given

						// Make this arc move and change colour
						if(!arcBloomSegInfo[nodePos1].hasOwnProperty('node'))
							arcBloomSegInfo[nodePos1]['node'] = scope.arcs[ring2][seg];
						arcBloomSegInfo[nodePos1]['opacity'] = 1;
						arcBloomSegInfo[nodePos1]['moveTo'] = ring;
						arcBloomSegInfo[nodePos1]['colour'] = scope.nextColour(segArcColours[ring]['colour']);

						var nodePos2 = nodePosInDictList(segArcColours[ring]['node'], arcBloomSegInfo);
						if (nodePos2 == -1)  // If it's not already in the list . . .
							nodePos2 = ring;  // Just use the position given

						// Make the original arc disappear
						if(!arcBloomSegInfo[nodePos2].hasOwnProperty('node'))
							arcBloomSegInfo[nodePos2]['node'] = scope.arcs[ring][seg];
						arcBloomSegInfo[nodePos2]['opacity'] = 0;
						arcBloomSegInfo[nodePos2]['moveTo'] = ring;
						arcBloomSegInfo[nodePos2]['colour'] = segArcColours[ring]['colour'];

						// Reflect these changes in our temp segment
						segArcColours[ring] = scope.nextColour(segArcColours[ring]['colour']);
						segArcColours[ring2] = { colour:'', node:null};

						break;  // Stop looking for arcs, we only needed one

					} else {  // Not the same colour, but we have found the next arc to work with
						
						if (ring2 < ring-1) {  // Then this new arc needs to be moved to fill the space
							
							var nodePos = nodePosInDictList(segArcColours[ring2]['node'], arcBloomSegInfo);
							if (nodePos == -1)  // If it's not already in the list . . .
								nodePos = ring2;  // Just use the position given

							// Move the arc
							if(!arcBloomSegInfo[nodePos].hasOwnProperty('node'))
								arcBloomSegInfo[nodePos]['node'] = scope.arcs[ring2][seg];
							arcBloomSegInfo[nodePos]['opacity'] = 1;
							arcBloomSegInfo[nodePos]['moveTo'] = (ring-1);
							arcBloomSegInfo[nodePos]['colour'] = segArcColours[ring2]['colour'];
						}

						break;  // Stop looking for arcs, we only needed one
					};

				};
			};
		} else { // There is nothing in this spot, so we need to move the next arc over

			// Search for an arc to move here
			for (var ring2 = ring-1; ring2 >= 0; ring2--) {
				if (segArcColours[ring2]['node'] != null) {  // Then we have found another arc, stop here
					
					var nodePos = nodePosInDictList(segArcColours[ring2]['node'], arcBloomSegInfo);
					if (nodePos == -1)  // If it's not already in the list . . .
						nodePos = ring2;  // Just use the position given

					// Move the arc
					if(!arcBloomSegInfo[nodePos].hasOwnProperty('node'))  // We only need to set this once
						arcBloomSegInfo[nodePos]['node'] = scope.arcs[ring2][seg];
					arcBloomSegInfo[nodePos]['opacity'] = 1;
					arcBloomSegInfo[nodePos]['moveTo'] = ring;
					arcBloomSegInfo[nodePos]['colour'] = segArcColours[ring2]['colour'];

					// Reflect these changes in our temp segment
					segArcColours[ring] = segArcColours[ring2];
					segArcColours[ring2] = { colour:'', node:null};

					ring++;  // We want to relook at this arc since it may need to be merged with another arc
					break;  // Stop looking for arcs, we only needed one
				};
			};
		};
	};

	return arcBloomSegInfo;
};


function nodePosInDictList(node, list) {
	if (node == null) {
		console.log("null node");
		return -1;
	};
	for (var i = 0; i < list.length; i++) {
		if (list[i]['node'] == node)
			return i;
	};
	return -1;
};


function changeSelectedRing(direction) {
	if (direction == 'out') {
		// Change the current ring in memory
		if (++scope.curRing == scope.nRings) {
			scope.curRing--;
			return;
		}

		// Change the visual cursor
		var oldOuterRadius = scope.backgroundLayer.children[24].outerRadius();
		scope.runningTweens.push(new Kinetic.Tween({
			node: scope.backgroundLayer.children[24],
			duration: .2,
			innerRadius: oldOuterRadius,
			outerRadius: oldOuterRadius+30,
			easing: transition
		}).play());

	} else {  // direction == 'in'
		// Change the current ring in memory
		if (--scope.curRing == -1) {
			scope.curRing++;
			return;
		}

		// Change the visual cursor
		var oldInnerRadius = scope.backgroundLayer.children[24].innerRadius();
		scope.runningTweens.push(new Kinetic.Tween({
			node: scope.backgroundLayer.children[24],
			duration: .2,
			innerRadius: oldInnerRadius-30,
			outerRadius: oldInnerRadius,
			easing: transition
		}).play());
	};
};





















