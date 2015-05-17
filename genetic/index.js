var precision = 16;
var encoder = require('../functions/encoders/divide-precision')({ precision: precision });
module.exports = function genetic () {
	var population = generateInitialPopulation({ count: 10 });
};

//module.exports();

function generateInitialPopulation (params) {
	var population = [];
	for (var i = 0; i < params.count; ++i) {
		var random = Math.random() * 2 - 1;
		population.push(encoder.encode(random));
	}
	return population;
}