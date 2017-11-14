/*
The structure:
SuperBadge Class
comprises 5+/-
Objects from the SuperShape Class
*/

/*
This is the 2nd iteration of this code,
which was rebuilt specifically for
this tutorial.  If you haven't seen the
first iteration, I suggest you start there.

Comments from previous iterations of the code
have, for the most part, been replaced by new 
comments.

Note that I've used this experiment to
show how we can spread javascript and p5
out across multiple files.
*/

// array for holding SuperBadge objects
var myBadge = [];

// array for catching color palette
var myPalette = [];
var fixedRadius;

// these are supershape parameters;
// I may change how this works yet.
var superValues = [];

var defaultRadius;
var defaultMargin;
var iterativeReductionRatio;
var realX, realY;
var radius;
var qtyPoints;
var unitsWide,unitsHigh;
var bkgd;

function setup() {
    createCanvas (800,800);
	initialize();
    bkgd = (myPalette[int(random(myPalette.length))]);
	background(bkgd);
    //      var testBadge = new SuperBadge(0)
	// initially, we used a simple
	// temporary variable, testBadge.
	// Now that we know it works,
	// we need to instantiate these
	// objects into our main array.
	
	// I'm not yet worried with how to fit these 
	// on the screen, so I'll pick an arbitrary
	// h:w count of, say, 3:3, or 9 elements
	// in the array.
	
	var badgeTotal = unitsWide * unitsHigh;
	for (var badgeID = 0; badgeID < badgeTotal; badgeID++){
		
		// we now need the specific x and y for each
		// of our badges (a badge is a stack of 3 or more
			//supershape layers).  We'll store the x and the y
			// inside each badge -- and that address will affect
			// where all of the badge's layers are placed,
			// one on top of the other.
		
		// here's a trick to calculate x and y
		// coordinates when you only have a 
		// one dimensional number (0-15). 
		// This happens frequently when you have
		// a one-dimensional array (myArray[n])
		// that has to be transposed into two-dimensions
		// (x,y) or even three-dimensions
		// (x,y,z).  In this case, badgeID
		// is counting through a one-dimensional
		// array.  The other number we need
		// is the WIDTH of each row (in our
			// case, four units). So:
		
		var y = int(badgeID / unitsWide);
		var x = badgeID % unitsWide; 
		// using modulo to derive x offers a
		// nice parallel to division to find y.
		// If, y'know, you're into that kinda thing. 
		// You could calculate x in this fashion, too:
		// var x = badgeID - y;
		// In either case, x is a remainder...
		
		// We need to account for ellipses
		// being anchored from their center.
		// so if an ellipse is 100 units in diameter,
		// the anchor is at 50 units across. 100 * 0.5
		// We take the width/units across,
		// multiply by x, and add that to 
		// half of the width/units across.
		
		// I suppose I could also do this:
		// realX = x + 0.5;
		// realX = realX * (width/unitsWide);
		// 
		realX = x * (width/unitsWide)+((width/unitsWide)*0.5);
		realY = y * (height/unitsHigh)+((height/unitsHigh)*0.5);
		
		// (see how I pasted the function here for reference?)
		// (very handy it is.)
		// SuperBadge(_badgeID, _X, _Y, _shapeLayerQty) 
		
		var layerQty = 2;
		
		// don't forget:  When I push a new SuperBadge into
		// myBadge array, the SuperBadge constructor takes care
		// of building all 3-5 layer objects for me.
		myBadge.push(new SuperBadge(badgeID,realX,realY,layerQty));
	}
}

function draw() {
	background(bkgd);

	noLoop();
	// we needn't do this more than once,
	// since the image will be static.
	
	// let's see where all that work got us...
	// NB that I'll use push() and pop()
	// to handle badge placement.
	// Recall that push() saves the XY state
	// of the screen, and pop() restores
	// it.  If I didn't use push()pop(),
	// then the translate statements inside
	// the superbadge shell would accumulate,
	// and we'd be translated right off the page.
	
	for (var i = 0; i<myBadge.length; i++){
		
		// treat push() and pop() like parentheses in math expressions:
		// use them to help clarify the action for yourself
		// and the computer.  I use them more than I have to,
		// but (as in this case), it ensures that each time i
		// is incremented by 1, the screen is back where it started,
		// and not drifting off in some weird direction.
		// push and pop definitely slow things down a tiny bit --
		// especially if your screen size is large and there is
		// a lot of data thereupon.  But you won't notice a difference.
		// So go ahead!  Push() and pop() yourself silly.
		
		push();
		myBadge[i].showBadge();
		pop();
	}
}

function initialize() {
	unitsWide = 4;
	unitsHigh = 4;
    defaultRadius = (width/(unitsWide*2.0))*0.5;
	
	// percentage of space occupied by our shapes.
	defaultMargin = defaultRadius * 0.25;
	defaultRadius = defaultRadius * 0.75;
	
	 //qtyPoints is kind of a "resolution" setting.
	// it indicates how many points are being
	// calculated along 360 degrees of the ellipse.
	// In this case, PI/720 would be every 0.004363
	// radians, or 0.25 degrees (so the counter
	// will go from 0 to 360 by 0.25:  
	// 0, 0.25, 0.5, 0.75, 1, 1.25, etc.) 
	
	qtyPoints = 360;
	
	// note that this next line reflects my
	// decision to put the palette in a
	// separate file and pass the color array
	// back to the myPalette variable.  Why?
	// As the file WAS, I was obliged to use
	// palette as the variable name, and it
	// had to be global.  Now, no matter where
	// I use that palette code, (e.g.,
//		if I rip it out of this code and use
	// it in my next program), I can put the
	// color values into whatever variable
	// I want.  For example:
	// myPalette=createPalette();
	// spaceShipColors = createPalette();
	// holidayCardColors = createPalette();
	// Much more flexible.
	
	myPalette = createPalette();
}