var _ = require('lodash');

var chromosome = require('./chromosome');

module.exports = function population (options) {
	var safeOptions = options || {};
	var config = _.defaults(_.pick(safeOptions, ['paramsSize']), {
		paramsSize: 10
	});

	var population = [];

	var context = {
		generateInitialPopulation: generateInitialPopulation,
		toJSON: toJSON
	};

	return context;

	function generateInitialPopulation (params) {
		for (var i = 0; i < params.size; ++i) {
			var chromo = chromosome({ fitness: options.fitness });
			chromo.generateRandom({ size: config.paramsSize });
			population.push(chromo);
		}
		console.log('pop', population);
		return context;
	}

	function toJSON () {
		return {
			paramsSize: config.paramsSize,
			populationSize: population.length,
			population: population
		}
	}

};
