var population = require('./population');
var fitness = require('../functions/equal-maxima');
var crossover = require('./crossover/discrete-recombination');

module.exports = function genetic () {

	var populationSize = 10;
	var childrenPoolSize = 20;

	var currentPopulation = population({
		paramsSize: 10
	});
	currentPopulation.generateInitialPopulation({ size: populationSize });

	var childPopulation = population({
		paramsSize: 10
	});
	for (var i = 0; i < childrenPoolSize; ++i) {
		var child = crossover({ population: currentPopulation, parentsCount: 4 });
		childPopulation.addChromosome(child);
	}
	console.log(childPopulation.toJSON());
};

module.exports();
