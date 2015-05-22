var _ = require('lodash');
var chromosome = require('../chromosome');

module.exports = function discreteRecombination (params) {

	checkInputParams(params);

	var parents = generateParentsPool(params);

	var child = createChild({ parents: parents });
	console.log('child %j', child);
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

function createChild (params) {

	var chromosomeLength = params.parents[0].getSize();

	var childChromosome = chromosome({ size: chromosomeLength });

	for (var i = 0; i < childChromosome.getSize(); ++i) {

		var randomParentIndex = Math.floor(Math.random() * params.parents.length);

		var variable = params.parents[randomParentIndex].getVariable(i);

		childChromosome.setVariable({ index: i, variable: variable });

	}

	return childChromosome;

}

