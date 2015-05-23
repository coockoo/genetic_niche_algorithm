var _ = require('lodash');
var casual = require('casual');

module.exports = function chromosome (options) {

	if (!options.size) {
		throw new Error('Cannot create chromosome without size');
	}
	var size = options.size;
	var min = options.min;
	var max = options.max;
	var variables = getDefaultVariables({ size: size }); // X

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
			throw new Error('Index out of range ' + params.index);
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
	function generateRandom (params) {
		for (var i = 0; i < size; ++i) {
			setVariable({ index: i, variable: casual.double(params.min, params.max)});
		}
		return context;
	}
	function toJSON () {
		return variables.map(function (variable) {
			return variable.toFixed(2);
		});
	}
};

function getDefaultVariables (params) {
	return _(params.size).range().map(function () { return 0; }).valueOf();
}
