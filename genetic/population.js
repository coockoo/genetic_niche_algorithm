var chromosome = require('./chromosome');

module.exports = function population (options) {

	var fitness = options.fitness;

	var population = [];

	var context = {
		forEach: forEach,

		generateRandom: generateRandom,

		getChromosome: getChromosome,
		addChromosome: addChromosome,

		getBestChromosome: getBestChromosome,

		getSize: getSize,
		toJSON: toJSON
	};

	return context;

	function forEach (callback) {
		population.forEach(callback);
		return context;
	}
	function generateRandom (params) {
		for (var i = 0; i < params.size; ++i) {
			var randomChromosome = chromosome({ size: params.paramsSize, fitness: fitness });
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
	function addChromosome (chromosome) {
		population.push(chromosome);
		return context;
	}
	function getBestChromosome () {
		var bestChromosomeIndex = 0;
		var bestChromosomeFitness = getChromosome(bestChromosomeIndex).getFitness();
		for (var i = 1; i < getSize(); ++i) {
			var currentFitness = getChromosome(i).getFitness();
			if (currentFitness > bestChromosomeFitness) {
				bestChromosomeIndex = i;
				bestChromosomeFitness = currentFitness;
			}
		}
		return getChromosome(bestChromosomeIndex);
	}
	function getSize () {
		return population.length;
	}
	function toJSON () {
		return {
			size: getSize(),
			population: population
		};
	}
};
