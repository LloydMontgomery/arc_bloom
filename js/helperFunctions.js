scope.nextColour = function(oldColour) {
	switch(oldColour) {
		case '#99c299':
			return '#4d944d';
		case '#4d944d':
			return '#006600';
		case '#006600':
			return '#004700';
		case '#004700':
			return '#002900';
		case '#002900':
			return '#002900';
		default:
			console.log(oldColour);
			return "PROBLEM"
	};
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