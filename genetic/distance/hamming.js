module.exports = function hammingDistance (params) {
	var chromosome1 = params.chromosomes[0];
	var chromosome2 = params.chromosomes[1];

	var variablesSize = chromosome1.getSize();
	var sum = 0;
	for (var i = 0; i < variablesSize; ++i) {
		sum += Math.abs((chromosome1.getVariable(i) - chromosome2.getVariable(i)) / (params.max - params.min));
	}
	return sum / variablesSize;
};
