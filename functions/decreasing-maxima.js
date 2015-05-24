var _ = require('lodash');

module.exports = function decreasingMaxima (array) {
	if (array.length === 0) {
		throw new Error('Cannot process function for zero-length array.');
	}
	return _.reduce(array, function (sum, item) {
		return sum + decreasingMaximaNumber(item);
	}, 0);
};

function decreasingMaximaNumber (n) {
	return Math.exp( -2 * Math.log(2) * Math.pow( (n - 0.1) / 0.8, 2 ) ) * Math.pow(Math.sin(5 * Math.PI * n), 6);
}

