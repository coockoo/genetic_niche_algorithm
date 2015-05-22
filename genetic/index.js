var population = require('./population');
var fitness = require('../functions/equal-maxima');
var mutation = require('./mutation/basic');
var normalDistribution = require('./random/box-muller');

module.exports = function genetic () {

	var populationSize = 10;
	var paramsSize = 10;

	//TODO: add sigma calculation (between chromo distance / chromos count)
	var sigma = 10;
	var tao = 1 / Math.sqrt(paramsSize);
	var taoMutation = Math.exp(tao * normalDistribution());

	var currentPopulation = population({
		paramsSize: paramsSize
	});
	currentPopulation.generateInitialPopulation({ size: populationSize });

	sigma = sigma * taoMutation;
	console.log('%j', currentPopulation);
	currentPopulation = reproduction({
		population: currentPopulation,
		sigma: sigma
	});
	console.log('%j', currentPopulation);

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


module.exports();
