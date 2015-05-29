var _ = require('lodash');

var genetic = require('./genetic');

var population = require('./genetic/population');
var averageDistance = require('./genetic/distance/average-hamming');
var distance = require('./genetic/distance/hamming');

var fitness = require('./functions/equal-maxima');
var mutation = require('./genetic/mutation/basic');
var reproduction = require('./genetic/reproduction/mutation-better');

var combinations = require('./genetic/helpers/combinations');

var statistics = require('./statistics');

(function () {

	var input = {
		paramsSize: 1, // Size of the input parameters for fitness function
		populationSize: 100, // Input population size.
		min: 0, // Minimum value of each X in variables
		max: 1, // Maximum value of each X in variables
		maxGenerations: 500,
		stopFitnessThreshold: 0.001,
		peakThreshold: 0.005,

		testsRepetitions: 10,
		peaks: combinations([0.1, 0.3, 0.5, 0.7, 0.9], 1)
	};
	input.getSigma = function getSigma (params) {
		return averageDistance({ population: params.population, min: input.min, max: input.max }) / 2;
	};

	//_(input.testsRepetitions).range().forEach(runAlgorithm).valueOf();
	runAlgorithm();

	function runAlgorithm () {

		var currentStatistics = statistics({
			peaks: input.peaks,
			peakThreshold: input.peakThreshold,
			distance: distance,
			min: input.min,
			max: input.max
		});
		var currentPopulation = population({
			fitness: fitness
		});
		currentPopulation.generateRandom({
			size: input.populationSize,
			paramsSize: input.paramsSize,
			min: input.min,
			max: input.max
		});

		var geneticRunner = genetic({
			population: currentPopulation,
			sigma: input.getSigma({ population: currentPopulation }),
			reproduction: reproduction,
			mutation: mutation,
			stopFitnessThreshold: input.stopFitnessThreshold,
			maxGenerations: input.maxGenerations,
			onGenerationChanged: function onGenerationChanged (params) {
				currentStatistics.snapshot(params);
			}

		});

		var results = geneticRunner.run();
		console.log('%j', results.population);
		var jaja = currentStatistics.getStatistics({ population: results.population });
		console.log('%j', jaja);

	}


})();

