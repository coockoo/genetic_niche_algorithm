var genetic = require('./genetic');

var population = require('./genetic/population');
var averageDistance = require('./genetic/distance/average-hamming');

var fitness = require('./functions/equal-maxima');
var mutation = require('./genetic/mutation/basic');
var reproduction = require('./genetic/reproduction/mutation-better');

(function () {

	var input = {
		paramsSize: 2, // Size of the input parameters for fitness function
		populationSize: 100, // Input population size.
		min: -1, // Minimum value of each X in variables
		max: 1, // Maximum value of each X in variables
		maxGenerations: 200,
		stopFitnessThreshold: 0.001,

		repetitions: 10
	};

	var inputPopulation = population({
		paramsSize: input.paramsSize
	});
	inputPopulation.generateRandom({ size: input.populationSize, min: input.min, max: input.max });

	// Average distance between the input population
	var inputAverageDistance = averageDistance({ population: inputPopulation, min: input.min, max: input.max });

	runSigmaFromInitial();

	console.log('=======');

	runSigmaFromPrevious();

	function runSigmaFromInitial () {
		for (var i = 0; i < input.repetitions; ++i) {
			var geneticRunner = genetic({
				population: inputPopulation,
				sigma: inputAverageDistance / Math.pow(2, i + 1),
				reproduction: reproduction,
				fitness: fitness,
				mutation: mutation,
				stopFitnessThreshold: input.stopFitnessThreshold,
				maxGenerations: input.maxGenerations
			});

			geneticRunner.run();

		}
	}

	function runSigmaFromPrevious () {
		var currentAverageDistance = inputAverageDistance;
		for (var i = 0; i < input.repetitions; ++i) {
			var geneticRunner = genetic({
				population: inputPopulation,
				sigma: currentAverageDistance / Math.pow(2, i + 1),
				reproduction: reproduction,
				fitness: fitness,
				mutation: mutation,
				stopFitnessThreshold: input.stopFitnessThreshold,
				maxGenerations: input.maxGenerations
			});

			var currentPopulation = geneticRunner.run();
			currentAverageDistance = averageDistance({ population: currentPopulation, min: input.min, max: input.max });

		}

	}


})();

