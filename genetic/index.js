// TODO: see how to document module properly

/**
 *
 * @param options Input options for the genetic algorithm
 *
 * @param options.population Input population to process
 * @param options.sigma Sigma parameter used in the mutation
 * @param options.reproduction Reproduction function to create new generation
 * @param options.mutation Mutation function to be used
 * @param options.stopFitnessThreshold Threshold value to determine algorithm stop
 * @param options.maxGenerations Number after which we stop reproducing
 *
 * @param options.onGenerationChanged Function fired on generation changed
 */

module.exports = function genetic (options) {

	if (!options.population) {
		throw new Error('Cannot run genetic algorithm without population');
	}

	var stopGenerationsThreshold = 5;

	var results = {
		generations: 0,
		finalAverageFitness: null,
		finalFitnessDifference: null
	};
	return {
		run: run
	};

	function run () {

		results.generations = 0;

		var currentPopulation = options.population;
		var currentAverageFitness = currentPopulation.getAverageFitness();
		var prevAverageFitness = null;
		var stopCounter = 0;

		while ( stopCounter < stopGenerationsThreshold && ++results.generations < options.maxGenerations ) {

			currentPopulation = options.reproduction({
				population: currentPopulation,
				sigma: options.sigma,
				mutation: options.mutation
			});

			prevAverageFitness = currentAverageFitness;
			currentAverageFitness = currentPopulation.getAverageFitness();

			if ((currentAverageFitness - prevAverageFitness) > options.stopFitnessThreshold) {
				stopCounter = 0;
			} else {
				++stopCounter;
			}
		}

		results.finalAverageFitness = currentAverageFitness;
		results.finalFitnessDifference = (currentAverageFitness - prevAverageFitness);
		results.population = currentPopulation;

		return results;

	}
};
