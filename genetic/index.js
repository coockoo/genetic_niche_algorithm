var averageFitness = require('./fitness/average');

// TODO: see how to document module properly

/**
 *
 * @param options Input options for the genetic algorithm
 *
 * @param options.population Input population to process
 * @param options.sigma Sigma parameter used in the mutation
 * @param options.reproduction Reproduction function to create new generation
 * @param options.fitness Fitness function to be used
 * @param options.mutation Mutation function to be used
 * @param options.stopFitnessThreshold Threshold value to determine algorithm stop
 * @param options.maxGenerations Number after which we stop reproducing
 */

module.exports = function genetic (options) {
	if (!options.population) {
		throw new Error('Cannot run genetic algorithm without population');
	}
	var results = {
		generations: 0,
		finalAverageFitness: null,
		finalFitnessDifference: null
	};
	return {
		run: run
	};

	function run () {

		var currentPopulation = options.population;
		results.generations = 0;
		var prevAverageFitness = 0;
		var currentAverageFitness = averageFitness({ population: options.population, fitness: options.fitness });
		var stopCounter = 0;
		while (
			stopCounter < 5 &&
			results.generations <= options.maxGenerations
			) {

			if ((currentAverageFitness - prevAverageFitness) > options.stopFitnessThreshold) {
				stopCounter = 0;
			} else {
				++stopCounter;
			}

			++results.generations;
			currentPopulation = options.reproduction({
				population: currentPopulation,
				sigma: options.sigma,
				mutation: options.mutation,
				fitness: options.fitness
			});
			prevAverageFitness = currentAverageFitness;
			currentAverageFitness = averageFitness({ population: currentPopulation, fitness: options.fitness });
		}

		results.finalAverageFitness = currentAverageFitness;
		results.finalFitnessDifference = currentAverageFitness - prevAverageFitness;
		results.bestChromosome = currentPopulation.getBestChromosome({ fitness: options.fitness });

		console.log('%j', results);

		// TODO: what to return
		return currentPopulation;

	}
};
