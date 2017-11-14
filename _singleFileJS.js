// single-file version for codepen.io
// 13 October 2016

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
    createCanvas(640, 640);
	initialize();
	frameRate(25);
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
		
		var layerQty = 4;
		
		// don't forget:  When I push a new SuperBadge into
		// myBadge array, the SuperBadge constructor takes care
		// of building all 3-5 layer objects for me.
		myBadge.push(new SuperBadge(badgeID,realX,realY,layerQty));
	}
}

function draw() {
	background(bkgd);
	console.log(frameCount);
	//noLoop();
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
	defaultMargin = defaultRadius * 0.15;
	defaultRadius = defaultRadius * 0.85;
	
	 //qtyPoints is kind of a "resolution" setting.
	// it indicates how many points are being
	// calculated along 360 degrees of the ellipse.
	// In this case, PI/720 would be every 0.004363
	// radians, or 0.25 degrees (so the counter
	// will go from 0 to 360 by 0.25:  
	// 0, 0.25, 0.5, 0.75, 1, 1.25, etc.) 
	
	qtyPoints = 720;
	
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

// ***************

// Note that you don't always need the 
// ID number that I stick inside every
// Class I build.  But it does come in
// handy sometimes, and is a safe way
// to begin when I'm not sure what
// else to do...

// Note that in order to make things a bit
// clearer, I'm going to insert two
// supershapes into our Badge.  The array
// shapeLayer[] is where we'll store them.
// This may look confusing, but remember that
// we handle this process here in the same fashion 
// as we handle it outside of a Class -- we just
// add "this." to everything inside the Class.

function SuperBadge(_badgeID, _X, _Y, _shapeLayerQty) {
	this.badgeID = _badgeID;
	this.X = _X;
	this.Y = _Y;
	this.shapeLayer = [];
	var shapeQty = _shapeLayerQty;
	for (var layerID = 0; layerID<shapeQty; layerID++) {
		
		// so:  radius / number of layers 
		// gives us the size of each change as the
		// shapes shrink toward the middle.
		// take that and multiply it by layerID
		// and you have the number of pixels SMALLER
		// this layer radius should be.  So layer 0
		// is always exactly the radius; layer 1
		// is just one set of pixels narrower; layer
		// 2 is 2 units narrower, etc.
		// SUBTRACT that number from the default radius,
		// and you have the new radius size.
		
		// Whenever this becomes confusing, pull out your
		// process book and make sketches and diagrams
		// in order to understand things better.  I draw
		// constantly while I code -- comparing widths,
		// estimating sizes, etc.
		
		var layerRadius = defaultRadius - (layerID * (defaultRadius / shapeQty));	
		
		// this line gets a 6 element array from
		// the setSuperValues() function, which are
		// used to draw the shape.  If I wanted,
		// I could have done this in two steps,
		// first declaring superShapeConfig
		// like this:
		
		// var superShapeConfig = [];
		// superShapeConfig = setSuperValues();
		
		var superShapeConfig = setSuperValues();

		// randomized ink and paint 
		//(just my terms for stroke and fill).
		var tP = int(random(myPalette.length));
		var tI = int(random(myPalette.length));
		var layerPaint = myPalette[tP];
		var layerInk = myPalette[tI];
		
		var layerWeight = random(0,3);

		// now Build, damn you!  Build!
		// repeatedly push a new object into the array.
		this.shapeLayer.push(new SuperShape(layerID, this.badgeID, superShapeConfig, layerRadius, layerPaint, layerInk, layerWeight));
	}
	
	this.showBadge = function(){
		for (var i=0; i<this.shapeLayer.length; i++){
			fill(this.shapeLayer[i].layerPaint);
			stroke(this.shapeLayer[i].layerInk);
			strokeWeight(this.shapeLayer[i].layerWeight);
			
			push();
				translate(this.X, this.Y);
				this.shapeLayer[i].showShape();
			pop();
		}
	}
}

// Reference for myself
// SuperShape(layerID, this.badgeID, layerRad, layerPaint, layerInk, thickness));
function SuperShape(_shapeID, _owner, _shapeConfig, _layerRadius, _layerPaint, _layerInk, _thick) {
	this.shapeID = _shapeID;
	this.shapeOwner = _owner;
	this.shapeConfig = _shapeConfig;
	this.radius = _layerRadius;
	this.layerPaint = _layerPaint;
	this.layerInk = _layerInk;
	this.layerWeight = _thick;
	this.m = this.shapeConfig[0];
	this.n1 = this.shapeConfig[1];
	this.n2 = this.shapeConfig[2];
	this.n3 = this.shapeConfig[3];
	this.c = this.shapeConfig[4];
	this.a = this.shapeConfig[5];
	this.b = this.shapeConfig[6];
	
	this.showShape = function() {
		// NO LONGER just a dummy function
	    var inc = TWO_PI / qtyPoints;
		
		// build our custom shape
		// start with buildshape(),
		// end with endShape(CLOSE).
		// the CLOSE automatically
		// connects the start with the
		// end of the line.
		beginShape();
		for (var angle = 0; angle < (TWO_PI * this.c); angle = angle + inc) {
	        var r = this.plotSuperShape(angle);
	        var x = (r * cos(angle)) * this.radius;
	        var y = (r * sin(angle)) * this.radius;
	        vertex(x, y);
		}
		endShape(CLOSE);		
	}
	
	this.plotSuperShape = function(theta) {
    var p1 = (1.0 / this.a) * cos(theta * this.m * 0.25);
    p1 = pow(abs(p1), this.n2);
    var p2 = (1.0 / this.b) * sin(theta * this.m * 0.25);
    p2 = pow(abs(p2), this.n3);
    var p3 = pow(p1 + p2, 1.0 / this.n1);
    return (1.0 / p3);
	}
}

//****************
// These values serve as the starting point for the
// supershapes we use.  They are:
//	m, n1, n2, n3, c, a, b
 	// see Paul Bourke's site for more explanation

function setSuperValues() {
    var superValues = [
        [6, 60, 55, 30, 1, 1, 1],
        [4.4, 1, 1, 7, 3, 1, 1],
        [3.14159, 1, 1.15, 1.25, 12, 1, 1],
        [3.1, 3.5, 2.5, 30, 12, 1, 1],
        [TWO_PI, .3, 3, .6, 5, 1, 1],
        [5, 2, 16, 2.5, 12, 1, 1],
        [5, 1, 1, 1, 8, 1, 1],
        [8, 2, .5, .5, 2, 1, 1],
        [3, 0.2, 1.7, 1.7, 3, 1, 1],
        [13, 0.5, 4, 2, 3, 1, 1],
        [1625, 1, 1, 1, 12, 1, 1],
        [PI, 9.1, 9.1, 9.1, 12, 1, 1],
        [5, 1, 1, .5, 2, 1, 1],
        [5, 0.5, 2, 1, 12, 1, 1],
        [6, 0.53, 1.69, 0.45, 1, 1],
        [0, 1, 1, 1, 2, 1, 1],
        [15, 0.5, 0.5, 16, 4, 1, 1],
        [8, 0.5, 0.5, 8, 2, 1, 1],
        [5, 2, 7, 7, 2, 1, 1],
        [7, 2, 9, 1, 2, 1, 1],
        [3, 30, 30, 30, 2, 2, 1],
        [0.7, 1.5, 8, 8, 1, 1],
        [30, 75, 1.5, 35, 1, 0.6],
        [10, 1, 0.5, 2, 1, 1]
    ];

// In order to keep things from being over determinate, I pass the
// values from the array (above) through this function, which
// randomizes things a bit.

	var q = int(random(superValues.length));
    var adjustSuperValue = (random(1,2));// int(random(-1,1));//
	var adjustC = (random(1,2));
    m = int(superValues[q][0] * adjustSuperValue);
    n1 = superValues[q][1];
    n2 = superValues[q][2];
    n3 = superValues[q][3];
    c = int(superValues[q][4] * adjustC);
    a = superValues[q][5];
    b = superValues[q][6];

 // now we reassemble the thing and send it on its way
	var sendBackArray = [m,n1,n2,n3,c,a,b];
	return sendBackArray;
}
//*************

function createPalette() {
	// this routine returns a color palette array.
	// To use it, we need to be ready
	// to catch that data as it is returned.
	
	// I just pick the palette I want and un-comment it
	//
	
	// palette drawn from detail
	// of eBoy poster, ca. 2010


	// cool, adopted from kuler.adobe.com
	var palette=["#323A46","#22282F","#EB4A33","#FFFFFF","#E9F0F3","#0A0907","#FFFFFF"];
	
	/*	
	var palette =[
	    "#637051",
	    "#9C8C7E",
	    "#38392C",
	    "#C5C1A6",
	    "#F2F1E3",
	    "#B43D1D",
	    "#E2CB12",
	    "#28A0C1"
	];

	
	//architect, via color.adobe.com
	// adapted by me
	var palette =[
		"#C1E1ED",
		"#76C7C6",
		"#273D3B",
		"#273D3B",
		"#E35C14",
		"#090612",
		"#FFFFFF"		
	];
	/*
	//odd-end, adobe
	var palette=[
"#101308",
"#333136",
"#FF358B",
"#01B0F0",
"#AEEE00",
"#FFFFFF"
	];
	*/
	// send back the whole array of colors
	return palette;
}