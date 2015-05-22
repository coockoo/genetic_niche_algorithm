var _ = require('lodash');

function equalMaxima (array) {
	if (array.length === 0) {
		throw new Error('Cannot process function for zero-length array.');
	}
	var sum = _.reduce(array, function (sum, item) {
		return sum + equalMaximaNumber(item);
	}, 0);
	return (1 / array.length) * sum;
}

function equalMaximaNumber (x) {
	return Math.pow(Math.sin(5 * Math.PI * x), 6);
}

module.exports = equalMaxima;