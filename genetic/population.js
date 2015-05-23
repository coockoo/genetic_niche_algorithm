var _ = require('lodash');

var chromosome = require('./chromosome');

module.exports = function population (options) {
	var safeOptions = options || {};
	var config = _.defaults(_.pick(safeOptions, ['paramsSize']), {
		paramsSize: 10
	});

	var population = [];

	var context = {
		generateRandom: generateRandom,
		getChromosome: getChromosome,
		getBestChromosome: getBestChromosome,
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

	function generateRandom (params) {
		for (var i = 0; i < params.size; ++i) {
			var randomChromosome = chromosome({ size: config.paramsSize });
			randomChromosome.generateRandom({ min: params.min, max: params.max });
			population.push(randomChromosome);
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

	function getBestChromosome (params) {
		// TODO: maybe store fitness inside of the chromosome
		var bestChromosomeIndex = 0;
		var bestChromosomeFitness = params.fitness(getChromosome(bestChromosomeIndex).getVariables());
		for (var i = 0; i < getSize(); ++i) {
			var currentFitness = params.fitness(getChromosome(i).getVariables());
			if (currentFitness > bestChromosomeFitness) {
				bestChromosomeIndex = i;
				bestChromosomeFitness = currentFitness;
			}
		}
		return {
			index: bestChromosomeIndex,
			chromosome: getChromosome(bestChromosomeIndex),
			fitness: bestChromosomeFitness
		};
	}

	function toJSON () {
		return {
			size: population.length,
			population: population
		}
	}

};
