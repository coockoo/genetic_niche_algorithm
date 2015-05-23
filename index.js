var genetic = require('./genetic');

var population = require('./genetic/population');
var averageDistance = require('./genetic/distance/average-hamming');

var fitness = require('./functions/equal-maxima');
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

	var geneticOne = genetic({
		population: inputPopulation,
		sigma: currentAverageDistance / 2,
		reproduction: reproduction,
		fitness: fitness,
		mutation: mutation,
		stopFitnessThreshold: input.stopFitnessThreshold,
		maxGenerations: input.maxGenerations
	});

	geneticOne.run();

	var geneticTwo = genetic({
		population: inputPopulation,
		sigma: currentAverageDistance / 4,
		reproduction: reproduction,
		fitness: fitness,
		mutation: mutation,
		stopFitnessThreshold: input.stopFitnessThreshold,
		maxGenerations: input.maxGenerations
	});

	geneticTwo.run();

	var geneticThree = genetic({
		population: inputPopulation,
		sigma: currentAverageDistance / 8,
		reproduction: reproduction,
		fitness: fitness,
		mutation: mutation,
		stopFitnessThreshold: input.stopFitnessThreshold,
		maxGenerations: input.maxGenerations
	});

	geneticThree.run();


})();

