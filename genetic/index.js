var population = require('./population');
var fitness = require('../functions/equal-maxima');
var crossover = require('./crossover/discrete-recombination');

module.exports = function genetic () {

	var currentPopulation = population({
		paramsSize: 10,
		fitness: fitness
	});
	currentPopulation.generateInitialPopulation({ size: 10 });

	crossover({ population: currentPopulation, parentsCount: 4 });
};

module.exports();
