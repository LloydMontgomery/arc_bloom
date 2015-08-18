scope.newColour = function(oldColour1, oldOpacity1, oldColour2, oldOpacity2) {

	// Check to see if the colours and opacities of the arcs are the same
	if (oldColour1 == oldColour2 && oldOpacity1 == oldOpacity2){ 

		// Update opacity by 0.2
		oldOpacity1 += 0.25;

		// Check first if new opacity is > 1 (max)
		if (oldOpacity1 > 1) {
			return null;
		};

		newColour = { colour:  oldColour1, 
					  opacity: oldOpacity1 };   
		return newColour;

	} 
	// Check if arcs can combine into final colour (darkest red + darkest blue combines to purple)
	else if (oldColour1 != scope.colourSpec[2] && oldColour2 != scope.colourSpec[2] && oldOpacity1 == 1 && oldOpacity2 == 1) {
		newColour = { colour:  scope.colourSpec[2], 
					  opacity: scope.initOp };   
		return newColour;

	} 
	// Catchall - if arcs are the same colour and different opacities, do not combine
	else {  
		return null;
	};
};

// Returns the scale applied to an arc when it moves rings 
scope.scale = function(ring) {
	switch(ring) {
		case 0:
			return 1;
		case 1:
			return 1.429;
		case 2:
			return 1.857;
		case 3:
			return 2.286;
		case 4:
			return 4;  // This is the burst scale
	};
};

scope.hexToRgb = function(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

scope.rgbToHex = function(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
