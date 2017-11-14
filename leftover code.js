/*

Not being used at present


*/fixup! Reorganized files after brief coding hiatus


function computeSize() {
    var testRadius = radius;
    var testMax = 0;
    for (var angle = 0; angle < TWO_PI * 5; angle = angle + 0.012) {
        var r = superShape(angle);
        var test = r * cos(angle) * testRadius;
        if (test > testMax) {
            testMax = test;
        }
    }
    var fitRatio = testMax / testRadius;
    var fit = situatedIdealRadius / fitRatio;
    var fitment = fit * iterativeReductionRatio;
    return fitment;
}

	// do not delete!  some still in use.


	function computeSize() {
	    var testRadius = radius;
	    var testMax = 0;
	    for (var angle = 0; angle < TWO_PI * 5; angle = angle + 0.012) {
	        var r = superShape(angle);
	        var test = r * cos(angle) * testRadius;
	        if (test > testMax) {
	            testMax = test;
	        }
	    }
	    var fitRatio = testMax / testRadius;
	    var fit = situatedIdealRadius / fitRatio;
	    var fitment = fit * iterativeReductionRatio;
	    return fitment;
	}
	
	

	function FlowerLayer(_layerID, _ownerID, _rad, _layerFill, _layerStroke) {
	    this.layerID = _layerID;
	    this.ownerID = _ownerID;
	    this.layerFill = _layerFill;
	    this.layerStroke = _layerStroke;
	    this.layerRadius = _rad;
	    this.simpleSeed = random(0.2, 0.4);
	}

	function LOLFlower(_ID, _x, _y, _layerQty, _maxRad) {
	    this.LOLID = _ID;
	    this.X = _x;
	    this.Y = _y;
	    this.layerQty = _layerQty;
	    this.radius = _maxRad;
	    this.layerData = [];
	    var halfRad = this.radius * 0.5;
	    var layerInc = halfRad / this.layerQty;
	    for (var i = 0; i < this.layerQty; i++) {
	        var invI = (this.layerQty - 1) - i;
	        var layerRad = halfRad + (invI * layerInc);
	        this.layerData.push(new FlowerLayer(invI, this.LOLID, layerRad, color(255, 128), color(0, 128)));
	    }

	    this.showFlower = function() {
	        for (var i = 0; i < this.layerData.length; i++) {
	            fill(this.layerData[i].layerFill);
	            stroke(this.layerData[i].layerStroke);
	            strokeWeight(4);
	            var d = this.layerData[i].layerRadius * 2.0;
	            ellipse(this.X, this.Y, d, d);
	        }
	    }
		
		
		

	    translate(realX, realY);
	    var inc = TWO_PI / qtyPoints;
	    fetchValues();
	    var adjustedRadius = computeSize();
	    beginShape();
	    for (var angle = 0; angle < TWO_PI * c; angle = angle + inc) {
	        var r = superShape(angle);
	        var x = r * cos(angle) * adjustedRadius; //radius * adjR;
	        var y = r * sin(angle) * adjustedRadius; //radius * adjR;
	        vertex(x, y);
	    }
	    endShape(CLOSE);
	    iterativeReductionRatio = iterativeReductionRatio - reductioAdAbsurdam;
	    if (iterativeReductionRatio < reductioAdAbsurdam) {
	        nextGarden();
	    }
	