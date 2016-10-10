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