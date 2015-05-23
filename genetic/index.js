var population = require('./population');
var fitness = require('../functions/equal-maxima');
var mutation = require('./mutation/basic');
var averageDistance = require('./distance/average-hamming');
var averageFitness = require('./fitness/average');

module.exports = function genetic () {

	var populationSize = 10;
	var paramsSize = 2;

	var tao = 1 / Math.sqrt(paramsSize);
	//var taoMutation = Math.exp(tao * normalDistribution());
	var taoMutation = 1 / 2;

	var currentPopulation = population({
		paramsSize: paramsSize
	});
	var initialPopulation = currentPopulation.generateInitialPopulation({ size: populationSize });
	var sigma = averageDistance({ population: currentPopulation, min: -1, max: 1});
	var counter = 0;
	var prevAverageFitness = 0;
	var currentAverageFitness = averageFitness({ fitness: fitness, population: currentPopulation });
	while ( (currentAverageFitness - prevAverageFitness) > 0.001 && counter <= 10000 ) {
		++counter;
		//sigma = sigma * taoMutation;
		currentPopulation = reproduction({
			population: currentPopulation,
			sigma: sigma
		});
		prevAverageFitness = currentAverageFitness;
		currentAverageFitness = averageFitness({ population: currentPopulation });
	}
	for (var i = 0; i < populationSize; ++i) {
		console.log(fitness(currentPopulation.getChromosome(i).getVariables()), fitness(initialPopulation.getChromosome(i).getVariables()));
	}
	console.log(counter);
};

function reproduction (params) {

	var newPopulation = population({ paramsSize: params.population.getParamsSize() });
	for (var i = 0; i < params.population.getSize(); ++i) {
		var parentChromosome = params.population.getChromosome(i);
		var childChromosome = mutation({ chromosome: parentChromosome, sigma: params.sigma });

		var parentFitness = fitness(parentChromosome.getVariables());
		var childFitness = fitness(childChromosome.getVariables());
		if (childFitness > parentFitness) {
			newPopulation.addChromosome(childChromosome);
		} else {
			newPopulation.addChromosome(parentChromosome);
		}
	}
	return newPopulation;

}


//module.exports();
