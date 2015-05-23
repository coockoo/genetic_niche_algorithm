var genetic = require('./genetic');

var fitness = require('./functions/equal-maxima');
var population = require('./genetic/population');
var averageDistance = require('./genetic/distance/average-hamming');
var averageFitness = require('./genetic/fitness/average');
var mutation = require('./genetic/mutation/basic');
var reproduction = require('./genetic/reproduction/mutation-better');

(function () {

	var input = {
		paramsSize: 1, // Size of the input parameters for fitness function
		populationSize: 100, // Input population size.
		min: -1, // Minimum value of each X in variables
		max: 1, // Maximum value of each X in variables
		maxGenerations: 100,
		stopFitnessThreshold: 0.00001
	};

	var inputPopulation = population({
		paramsSize: input.paramsSize
	});
	inputPopulation.generateRandom({ size: input.populationSize, min: input.min, max: input.max });

	// Average distance between the input population
	var currentAverageDistance = averageDistance({ population: inputPopulation, min: input.min, max: input.max });

	runGenetic({
		population: inputPopulation,
		sigma: currentAverageDistance / 32,
		maxGenerations: input.maxGenerations,
		stopFitnessThreshold: input.stopFitnessThreshold
	});


})();

function runGenetic (params) {

	var currentPopulation = params.population;
	var counter = 0;
	var prevAverageFitness = 0;
	var currentAverageFitness = averageFitness({ population: params.population, fitness: fitness });
	while ( (currentAverageFitness - prevAverageFitness) > params.stopFitnessThreshold && counter <= params.maxGenerations ) {
		++counter;
		currentPopulation = reproduction({
			population: currentPopulation,
			sigma: params.sigma,
			mutation: mutation,
			fitness: fitness
		});
		prevAverageFitness = currentAverageFitness;
		currentAverageFitness = averageFitness({ population: currentPopulation, fitness: fitness });
	}

	console.log('finished at cycle %d', counter);
	console.log('finished with average fitness %d', currentAverageFitness);
	console.log('finished with prev average fitness %d', prevAverageFitness);
	console.log('difference is %d', currentAverageFitness - prevAverageFitness);

	return currentPopulation;

}
