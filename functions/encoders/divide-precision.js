var _ = require('lodash');
var gray = require('./gray-encoder');

function dividePrecision (params) {
	var safeParams = params || {};
	var config = _.defaults(_.pick(safeParams, ['precision']), {
		precision: 16
	});

	var divider = Math.pow(2, config.precision) - 1;

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
		return gray.encode(bitArray);

	}

	function decode (array) {
		if (array.length !== config.precision + 1) {
			throw new Error('Cannot decode array. Invalid length');
		}
		var decodedArray = gray.decode(array);
		var sign = decodedArray[0];
		var number = parseInt(decodedArray.join('').slice(1), 2);
		if (sign == '0') {
			return number / divider;
		} else {
			return -number /divider;
		}
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
		encode: encode,
		decode: decode
	}

}

function convertToBitArray (number) {
	return number.toString(2).split('').map(function (value) { return +value; });
}

module.exports = dividePrecision;
