var _ = require('lodash');

module.exports = function discreteRecombination (params) {

	checkInputParams(params);

	var parents = generateParentsPool(params);
	console.log(parents);

};

//TODO: maybe move to another file (different parents pool strategies);
function generateParentsPool (params) {
	if (params.population.getSize() === params.parentsCount) {
		return params.population;
	}
	var indexes = _.range(0, params.population.getSize());
	var picked = [];
	while (picked.length < params.parentsCount) {
		var randomIndex = Math.floor(Math.random() * indexes.length);
		picked.push(indexes[randomIndex]);
		indexes.splice(randomIndex, 1);
	}
	return _.map(picked, function (index) {
		return params.population.getChromosome(index);
	});
}

function checkInputParams (params) {
	if (params.parentsCount > params.population) {
		throw new Error('Cannot select enough parents from population. Too small');
	}
}

