module.exports = function boxMuller () {
	var x1, x2, w, y1, y2;

	do {
		x1 = 2.0 * Math.random() - 1.0;
		x2 = 2.0 * Math.random() - 1.0;
		w = x1 * x1 + x2 * x2;
	} while ( w >= 1.0 );

	w = Math.sqrt( (-2.0 * Math.log( w ) ) / w );
	y1 = x1 * w;
	return y1;
};
