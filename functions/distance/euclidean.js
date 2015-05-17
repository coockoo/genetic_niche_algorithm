var _ = require('lodash');

function euclideanDistance (vector1, vector2) {
	if (vector1.length !== vector2.length) {
		throw new Error('Cannot calculate euclidean distance for non-equal distance vectors.');
	}
	var result = _.reduce(vector1, function (sum, value, index) {
		return sum + Math.pow(vector1[index] - vector2[index], 2);
	}, 0);
	return Math.sqrt(result);
}

module.exports = euclideanDistance;
