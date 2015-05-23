var hammingDistance = require('./hamming');

/**
 *
 * @param params Parameters of the average hamming distance function
 * @param params.population Input population to calculate
 * @param params.min Minimum value of the interval
 * @param params.max Maximum value of the interval
 * @returns {number}
 */
module.exports = function averageDistance (params) {
	var sum = 0;
	for (var i = 0; i < params.population.getSize(); ++i) {
		for (var j = i + 1; j < params.population.getSize(); ++j) {
			sum += hammingDistance({
				chromosomes: [ params.population.getChromosome(i) , params.population.getChromosome(j) ],
				min: params.min,
				max: params.max
			});
		}
	}
	return 2 * sum / (params.population.getSize() * (params.population.getSize() - 1));
};
