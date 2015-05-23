var population = require('../population');

/**
 * @desc Function that mutate parent and picks better children/parent into next generation.
 * @param params Input params for the reproduction
 *
 * @param params.population Population to be reproduced
 * @param params.sigma Sigma value used in mutation function
 * @param params.mutation Mutation function to be applied to chromosome
 * @param params.fitness Fitness function to be applied to child and parent to select parent or children
 *
 * @returns {population}
 */
module.exports = function reproduction (params) {

	var newPopulation = population({ paramsSize: params.population.getParamsSize() });

	for (var i = 0; i < params.population.getSize(); ++i) {
		var parentChromosome = params.population.getChromosome(i);
		var childChromosome = params.mutation({ chromosome: parentChromosome, sigma: params.sigma });

		var parentFitness = params.fitness(parentChromosome.getVariables());
		var childFitness = params.fitness(childChromosome.getVariables());
		if (childFitness > parentFitness) {
			newPopulation.addChromosome(childChromosome);
		} else {
			newPopulation.addChromosome(parentChromosome);
		}
	}
	return newPopulation;

};
