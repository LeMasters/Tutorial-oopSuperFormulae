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

// CLASSES FILE

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
		
		// the next expression will gradually shrink 
		// our shapes' radii, based on where it falls
		// in the order of the layerID.
		// It may be confusing, so let's take it apart:
		// defaultRadius/shapeQty gives us the size of the
		// 'building block' here -- it is the size of the
		// of change we can see between two proximate layers.
		// e.g., 50/2 = 25 pixel change in radius with each layer.
		// Multiply that by the layerID and we get
		// the total amount of change in radius from the zero-th
		// layer to this current layer.
		// e.g., 0 * 25 = 0 change at layer 0 
		// Finally, subtract the amount of change from
		// our default radius, since we need to start wide and grow
		// narrow, not the other way 'round.
		
		var layerRadius = defaultRadius - (layerID * (defaultRadius / shapeQty));	
		
			// note that I'm storing the color itself in the variable,
			// not just a reference to the array element that
		// actually stores the color (which would be t, below).
		var t = int(random(myPalette.length));
		var layerPaint = myPalette[t];
		
		// now Build, damn you!  Build!
		// repeatedly push a new object into the array.
		this.shapeLayer.push(new SuperShape(layerID, this.badgeID, layerRadius, layerPaint));
	}
	
	this.showBadge = function(){
		noStroke();
		for (var i=0; i<this.shapeLayer.length; i++){
			fill(this.shapeLayer[i].layerPaint);
			var dia = this.shapeLayer[i].radius * 2.0;
			// ellipse needs diameter, not radius...
			
			ellipse(this.X, this.Y, dia, dia);
		}
	}
}

// Reference for myself
// SuperShape(layerID, this.badgeID, layerRad, layerPaint));
function SuperShape(_shapeID, _owner, _layerRadius, _layerPaint) {
	this.shapeID = _shapeID;
	this.shapeOwner = _owner;
	this.radius = _layerRadius;
	this.layerPaint = _layerPaint;
	
	this.showShape = function() {
		// just a dummy function
	}
}



function SuperTimer(_isArmed, _millisFromNow){
	this.isArmed = _isArmed;
	this.timerStart = millis();
	this.millisFromNow = _millisFromNow;
	
	this.clockWatcher = function() {
		// dummy f()
	}
}

// PALETTE FILE

function createPalette() {
	// this routine returns a color palette array.
	// To use it, we need to be ready
	// to catch that data as it is returned.
	
	// palette drawn from detail
	// of eBoy poster, ca. 2010
	var palette = [
	    "#637051",
	    "#9C8C7E",
	    "#38392C",
	    "#C5C1A6",
	    "#F2F1E3",
	    "#B43D1D",
	    "#E2CB12",
	    "#28A0C1"
	];
	
	return palette;
}