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
    var adjustSuperValue = int(random(1,3));// int(random(-1,1));//
	var adjustC = (random(0.75,1.25));
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