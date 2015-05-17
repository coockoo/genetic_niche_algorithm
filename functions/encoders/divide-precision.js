var _ = require('lodash');

function dividePrecision (params) {
	var safeParams = params || {};
	var config = _.defaults(_.pick(safeParams, ['precision']), {
		precision: 16
	});

	var divider = Math.pow(config.precision, 2) - 1;

	var cache = [];

	function encode (number) {
		var processNumber = Math.abs(number);

		var intValue = getIntValue(processNumber);

		var bitArray = convertToBitArray(intValue);

		bitArray = correctLength(bitArray);

		if (number < 0) {
			bitArray.unshift(1);
		} else {
			bitArray.unshift(0);
		}
		return bitArray;

	}

	function getIntValue (number) {
		for (var i = 1; i < divider; ++i) {

			if (!cache[i] && cache[i] !== 0) {
				cache[i] = i / divider;
			}

			if (number == cache[i]) {
				return i;
			}

			if (number < cache[i]) {
				return i - 1;
			}

		}
		return divider;
	}

	function correctLength (array) {
		var arrayLength = array.length;
		for (var i = 0; i < config.precision - arrayLength; ++i) {
			array.unshift(0);
		}
		return array;
	}

	return {
		encode: encode
	}

}

function convertToBitArray (number) {
	return number.toString(2).split('').map(function (value) { return +value; });
}

module.exports = dividePrecision;
