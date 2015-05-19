module.exports = function chromosome (options) {

	var variables = options.variables || []; // X
	var deviations = options.diviations || []; // E
	var angles = options.angles || []; // A (not used)

	var fitness = options.fitness || defaultFitness;

	var evolutionParameter = options.evolutionParameter || 25; // Recommended value

	var context = {
		generateRandom: generateRandom,
		getFitness: getFitness,
		toJSON: toJSON
	};

	return context;

	function getFitness () {
		return fitness(variables);
	}

	function generateRandom (params) {
		for (var i = 0; i < params.size; ++i) {

			//TODO: add min/max value instead of random to this shit
			var randomVariable = Math.random() * 2 - 1;
			variables.push(randomVariable);

			var randomDeviation = Math.random() * evolutionParameter;
			deviations.push(randomDeviation);

		}
		return context;

	}

	function toJSON () {
		return {
			evolutionParameter: evolutionParameter,
			variables: variables,
			deviations: deviations
		};
	}
};

function defaultFitness () {
	return 0;
}
