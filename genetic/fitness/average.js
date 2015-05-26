module.exports = function averageFitness (params) {
	var sum = 0;
	for (var i = 0; i < params.population.getSize(); ++i) {
		sum += params.population.getChromosome(i).getFitness();
	}
	return sum / params.population.getSize();
};
