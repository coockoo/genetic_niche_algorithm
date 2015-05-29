var _ = require('lodash');

var chromosome = require('./genetic/chromosome');

function statistics (options) {

	var peaks = options.peaks;
	var peakThreshold = options.peakThreshold;

	var snapshots = [

	];

	var context = {
		getStatistics: getStatistics,
		snapshot: snapshot

	};

	return context;

	function getStatistics (params) {
		var indexesFound = getPeaksFoundIndexes({ population: params.population });
		var peaksFound = getPeaksByIndexes(indexesFound);
		var peakAccuracy = getPeakAccuracy({ population: params.population });
		return {
			peaksFound: peaksFound,
			allPeaksFound: indexesFound.length === peaks.length,
			peakAccuracy: peakAccuracy
		};
	}

	function getPeakIndex (candidate) {
		for (var i = 0; i < peaks.length; ++i) {
			if (isPeak(candidate, peaks[i])) {
				return i;
			}
		}
		return null;
	}

	function isPeak (candidate, peak) {
		return _.every(peak, function (peakVariable, index) {
			return Math.abs(candidate[index] - peakVariable) < peakThreshold;
		});
	}

	function getPeaksFoundIndexes (params) {
		var res = [];
		for (var i = 0; i < params.population.getSize(); ++i) {
			var idx = getPeakIndex(params.population.getChromosome(i).getVariables());
			if (!_.isNull(idx) && res.indexOf(idx) === -1) {
				res.push(idx);
			}
		}
		return res;
	}

	function getPeaksByIndexes (indexes) {
		return _.filter(peaks, function (peak, index) {
			return _.includes(indexes, index);
		});
	}

	function getPeakAccuracy (params) {
		var fitnessFunction = params.population.getFitnessFunction();
		return _.reduce(peaks, function (sum, peak, index) {
			var peakChromosome = chromosome({
				variables: peak,
				size: peak.length,
				fitness: fitnessFunction
			});
			var peakFitness = peakChromosome.getFitness();
			var closestChromosome = params.population.getClosestChromosome({ chromosome: peakChromosome, distance: options.distance, min: options.min, max: options.max });
			var closestFitness = closestChromosome.getFitness();
			return sum + Math.abs(peakFitness - closestFitness);
		}, 0);
	}

	function getMinDistance (distances) {
		//return _.reduce(distances, function (sum, distance) {
		//	return sum + distance.distance;
		//}, 0);
	}

	function snapshot (params) {
		var shot = {
			population: params.population
		};
		snapshots.push(shot);
		return context;
	}

}

module.exports = statistics;
