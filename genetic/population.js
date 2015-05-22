var _ = require('lodash');

var chromosome = require('./chromosome');

module.exports = function population (options) {
	var safeOptions = options || {};
	var config = _.defaults(_.pick(safeOptions, ['paramsSize']), {
		paramsSize: 10
	});

	var population = [];

	var context = {
		generateInitialPopulation: generateInitialPopulation,
		getChromosome: getChromosome,
		getParamsSize: getParamsSize,
		addChromosome: addChromosome,
		getSize: getSize,
		toJSON: toJSON
	};

	return context;

	function getParamsSize () {
		return config.paramsSize;
	}
	function addChromosome (chromosome) {
		population.push(chromosome);
	}

	function generateInitialPopulation (params) {
		for (var i = 0; i < params.size; ++i) {
			var chromo = chromosome({ size: config.paramsSize });
			chromo.generateRandom();
			population.push(chromo);
		}
		return context;
	}

	function getChromosome (index) {
		if (index < 0 || index >= population.length) {
			throw new Error('Cannot get chromosome from population. Index out of range.');
		}
		return population[index];
	}

	function getSize () {
		return population.length;
	}

	function toJSON () {
		return {
			size: population.length,
			population: population
		}
	}

};
