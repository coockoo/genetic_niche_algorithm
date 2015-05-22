var _ = require('lodash');

module.exports = function chromosome (options) {

	var size = options.size || 10; // todo: default chromosome size

	var variables = options && options.variables || getDefaultVariables({ size: size }); // X

	var angles = options && options.angles || []; // A (not used)


	var context = {
		generateRandom: generateRandom,
		setVariable: setVariable,
		getVariables: getVariables,
		getSize: getSize,
		getVariable: getVariable,
		toJSON: toJSON
	};

	return context;

	function getVariables () {
		return variables;
	}
	function setVariable (params) {
		if ( params.index < 0 || params.index >= variables.length ) {
			throw new Error('Index out of range ' + index);
		}
		variables[params.index] = params.variable;
		return context;
	}

	function getSize () {
		return size;
	}

	function getVariable (index) {
		if ( index < 0 || index >= variables.length ) {
			throw new Error('Index out of range ' + index);
		}
		return variables[index];
	}

	function generateRandom () {
		for (var i = 0; i < size; ++i) {
			//TODO: add min/max value instead of random to this shit
			setVariable({ index: i, variable: Math.random() * 2 - 1});
		}
		return context;

	}

	function toJSON () {
		return variables.map(function (variable) {
			return variable.toFixed(2);
		})
	}
};

function getDefaultVariables (params) {
	return _(params.size).range().map(function () { return 0; }).valueOf();
}
