function crossover (parents) {
	if (parents.length != 2) {
		throw new Error('There must be exactly 2 parents, but got ' + parents.length);
	}
	if(parents[0].length != parents[1].length) {
		throw new Error('There must be parents of the same length, but got ' + parents[0].length + ' and ' + parents[1].length);
	}

	var parentLength = parents[0].length;
	var crossingPoint = Math.round(Math.random() * (parentLength - 2) + 1);

	var child1 = parents[1].slice(0, crossingPoint).concat(parents[0].slice(crossingPoint));
	var child2 = parents[0].slice(0, crossingPoint).concat(parents[1].slice(crossingPoint));

	return [child1, child2];
}

module.exports = crossover;