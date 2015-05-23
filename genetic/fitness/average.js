module.exports = function averageFitness (params) {
	var sum = 0;
	for (var i = 0; i < params.population.getSize(); ++i) {
		sum += params.fitness(params.population.getChromosome(i).getVariables());
	}
	return sum / params.population.getSize();
};
