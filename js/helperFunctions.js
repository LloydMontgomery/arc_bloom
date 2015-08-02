scope.newColour = function(oldColour1, oldColour2) {
	console.log(oldColour1 + ' ' + oldColour2)
	if (oldColour1 == oldColour2) {
		switch (oldColour1) {
			case scope.redSpec[0]:
				return scope.redSpec[1];
				break;
			case scope.redSpec[1]:
				return scope.redSpec[2];
				break;
			case scope.blueSpec[0]:
				return scope.blueSpec[1];
				break;
			case scope.blueSpec[1]:
				return scope.blueSpec[2];
				break;
			case scope.purpleSpec[0]:
				return scope.purpleSpec[1];
				break;
			case scope.purpleSpec[1]:
				return scope.purpleSpec[2];
				break;
			default:
				return null;
		};
	} else if ((oldColour1 == scope.redSpec[2] && oldColour2 == scope.blueSpec[2]) || 
			   (oldColour1 == scope.blueSpec[2] && oldColour2 == scope.redSpec[2])) {
		return scope.purpleSpec[0];
	} else {
		return null;
	}
};

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

// scope.nextColour = function(ring) {
// 	switch(ring) {

// 	}
// }