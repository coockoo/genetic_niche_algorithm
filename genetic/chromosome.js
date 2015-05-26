var _ = require('lodash');
var casual = require('casual');

module.exports = function chromosome (options) {

	if (!options.size) {
		throw new Error('Cannot create chromosome without size');
	}
	var size = options.size;
	var variables = options.variables || getDefaultVariables({ size: size }); // X
	var fitnessValue = null;
	var fitnessFunction = options.fitness;

	var context = {
		getVariables: getVariables,
		setVariables: setVariables,

		getVariable: getVariable,
		setVariable: setVariable,

		getFitness: getFitness,

		getSize: getSize,

		generateRandom: generateRandom,

		toJSON: toJSON
	};

	return context;

	function getVariables () {
		return variables;
	}
	function setVariables (newVariables) {
		if (newVariables.length !== variables.length) {
			throw new Error('Size mismatch. Expected ' + variables.length + ' got ' + newVariables.length);
		}
		_.forEach(newVariables, function (v, i) {
			setVariable({ index: i, variable: v });
		});
		return context;
	}
	function getVariable (index) {
		if ( index < 0 || index >= variables.length ) {
			throw new Error('Index out of range ' + index);
		}
		return variables[index];
	}
	function setVariable (params) {
		if ( params.index < 0 || params.index >= variables.length ) {
			throw new Error('Index out of range ' + params.index);
		}
		variables[params.index] = params.variable;
		fitnessValue = null;
		return context;
	}
	function getFitness () {
		if (!fitnessFunction) {
			throw new Error('Cannot calculate fitness without fitness function');
		}
		if (_.isNull(fitnessValue))  {
			fitnessValue = fitnessFunction(variables);
		}
		return fitnessValue;
	}
	function getSize () {
		return size;
	}
	function generateRandom (params) {
		_(size).range().forEach(function (i) {
			setVariable({ index: i, variable: casual.double(params.min, params.max)});
		});
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
