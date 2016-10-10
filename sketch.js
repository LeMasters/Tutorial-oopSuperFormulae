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

var n1;
var n2;
var n3;
var a;
var b;
var c;
var defaultRadius;
var defaultMargin;
var iterativeReductionRatio;
var realX, realY;
var radius;
var qtyPoints;
var unitsWide,unitsHigh;

function setup() {
    createCanvas(600, 600);
    smooth();
	initialize();
	
    var bkgd = (myPalette[int(random(myPalette.length))]);
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
		
		realX = x * (width/unitsWide)+((width/unitsWide)*0.5);
		realY = y * (height/unitsHigh)+((height/unitsHigh)*0.5);
		
		// (see how I pasted the function here for reference?)
		// SuperBadge(_badgeID, _X, _Y, _shapeLayerQty) 
		var layerQty = 5;
		
		// don't forget:  When I push a new SuperBadge into
		// myBadge array, the SuperBadge constructor takes care
		// of building my 5 layer objects for me.
		myBadge.push(new SuperBadge(badgeID,realX,realY,layerQty));
	}
}

function draw() {
	// no need to exert ourselves here
	noLoop();
	
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
		push();
		myBadge[i].showBadge();
		pop();
	}
}

function initialize() {
	unitsWide = 5;
	unitsHigh = 5;
    defaultRadius = width/(unitsWide*2.0);
	defaultMargin = defaultRadius * 0.2;
	defaultRadius = defaultRadius * 0.8;

	// note that this line reflects my
	// decision to put the palette in a
	// separate file and pass the color array
	// back to the myPalette variable.  Why?
	// As the file WAS, I was obliged to use
	// palette as the variable name, and it
	// had to be global.  Now, no matter where
	// I use that palette code, I can put the
	// color values into whatever variable
	// I want.  Much more flexible.
	myPalette = createPalette();
}