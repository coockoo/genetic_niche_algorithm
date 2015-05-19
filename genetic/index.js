var population = require('./population');
var fitness = require('../functions/equal-maxima');

module.exports = function genetic () {
	var currentPopulation = population({
		paramsSize: 10,
		fitness: fitness
	});
	currentPopulation.generateInitialPopulation({ size: 10 });
	console.log('current population %j', currentPopulation);
};

module.exports();
