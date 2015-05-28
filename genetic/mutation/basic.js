var chromosome = require('../chromosome');
var normalDistribution = require('../random/box-muller');

module.exports = function basic (params) {
	var chromosomeSize = params.chromosome.getSize();
	var mutated = chromosome({ size: chromosomeSize, fitness: params.chromosome.getFitnessFunction() });
	for (var i = 0; i < chromosomeSize; ++i) {
		mutated.setVariable({ index: i, variable: params.chromosome.getVariable(i) + params.sigma * normalDistribution()});
	}
	return mutated;
};
