var _ = require('lodash');

module.exports = function chromosome (options) {

	var size = options.size || 10; // todo: default chromosome size

	var variables = options && options.variables || getDefaultVariables({ size: size }); // X
	var deviations = options && options.deviations || getDefaultDeviation({ size: size }); // E

	var angles = options && options.angles || []; // A (not used)

	var evolutionParameter = options && options.evolutionParameter || 25; // Recommended value

	var context = {
		generateRandom: generateRandom,
		setVariable: setVariable,
		setDeviation: setDeviation,
		getFitness: getFitness,
		getSize: getSize,
		getVariable: getVariable,
		toJSON: toJSON
	};

	return context;

	function setVariable (params) {
		if ( params.index < 0 || params.index >= variables.length ) {
			throw new Error('Index out of range ' + index);
		}
		variables[params.index] = params.variable;
		return context;
	}
	function setDeviation (params) {
		if ( params.index < 0 || params.index >= variables.length ) {
			throw new Error('Index out of range ' + index);
		}
		deviations[params.index] = params.deviation;
		return context;
	}

	function getFitness (fitness) {
		return fitness(variables);
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
			setDeviation({ index: i, deviation: getDeviation({ evolutionParameter: evolutionParameter}) });
		}
		return context;

	}

	function toJSON () {
		return {
			evolutionParameter: evolutionParameter,
			variables: variables,
			deviations: deviations
		};
	}
};

function getDeviation (params) {
	return Math.random() * params.evolutionParameter;
}

function getDefaultVariables (params) {
	return _(params.size).range().map(function () { return 0; }).valueOf();
}
function getDefaultDeviation (params) {
	return _(params.size).range().map(function () { return 0; }).valueOf();
}
