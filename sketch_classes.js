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



function SuperTimer(_isArmed, _millisFromNow){
	this.isArmed = _isArmed;
	this.timerStart = millis();
	this.millisFromNow = _millisFromNow;
	
	this.clockWatcher = function() {
		// dummy f()
	}
}