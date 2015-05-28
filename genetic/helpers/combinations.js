var _ = require('lodash');

function combinations (values, n) {
	if (n === 0) {
		return [ [] ];
	}
	return _(combinations(values, n-1)).map(function (arr) {
		return _(values).map(function (val) {
			return arr.concat([val]);
		}).valueOf();
	}).flatten().valueOf();
}

module.exports = combinations;
