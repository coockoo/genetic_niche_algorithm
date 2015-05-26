var population = require('../population');

/**
 * @desc Function that mutate parent and picks better children/parent into next generation.
 * @param params Input params for the reproduction
 *
 * @param params.population Population to be reproduced
 * @param params.sigma Sigma value used in mutation function
 * @param params.mutation Mutation function to be applied to chromosome
 *
 * @returns {population}
 */
module.exports = function reproduction (params) {

	var newPopulation = population({ fitness: params.population.getFitnessFunction() });

	for (var i = 0; i < params.population.getSize(); ++i) {
		var parentChromosome = params.population.getChromosome(i);
		// TODO: think about the mutation inside the chromosome
		var childChromosome = params.mutation({ chromosome: parentChromosome, sigma: params.sigma });

		var parentFitness = parentChromosome.getFitness();
		var childFitness = childChromosome.getFitness();
		if (childFitness > parentFitness) {
			newPopulation.addChromosome(childChromosome);
		} else {
			newPopulation.addChromosome(parentChromosome);
		}
	}
	return newPopulation;
};
