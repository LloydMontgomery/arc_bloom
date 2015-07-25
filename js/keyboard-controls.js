window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
        switch(e.which) {
        	case 38:  // UP Arrow Key
        		break
        	case 40:  // DOWN Arrow Key
        		break;
        	case 37:  // LEFT Arrow Key
        		break;
        	case 39:  // RIGHT Arrow Key
        }
        console.log(e.which)
    }
}, false);
