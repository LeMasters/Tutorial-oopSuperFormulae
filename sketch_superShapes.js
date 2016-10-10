// array particular to the creation of supershapes.
// don't worry about this for now.
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
}

function adjustSuperValues() {
    var q = int(random(superValues.length));
    var adj = int(int(random(10, 40)) * 0.1)-0.5;
    m = superValues[q][0] * adj;
    n1 = superValues[q][1] * adj;
    n2 = superValues[q][2] * adj;
    n3 = superValues[q][3] * adj;
    c = superValues[q][4] * adj;
    a = superValues[q][5];
    b = superValues[q][6];
}

// takes supervalues and creates 
// data for supershapes
function plotSuperShape(theta) {
    var p1 = (1.0 / a) * cos(theta * m * 0.25);
    p1 = pow(abs(p1), n2);
    var p2 = (1.0 / b) * sin(theta * m * 0.25);
    p2 = pow(abs(p2), n3);
    var p3 = pow(p1 + p2, 1.0 / n1);
    return (1.0 / p3);
}