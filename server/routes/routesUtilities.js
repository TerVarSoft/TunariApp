var _ = require('lodash');

var buildQuery = function(requestQuery){
	
	var query = requestQuery;
	var nameRangeSeparator = ";";
	
	if (query.tags) {
		var tagsString = requestQuery.tags.split(" ");        
		var tagsRegExp = [];

		// Name Filtering
		var nameRangeKey = _.findLast(tagsString, function(tag){
			return _.includes(tag, nameRangeSeparator);
		});

		if(nameRangeKey){
			var nameRanges = nameRangeKey.split(nameRangeSeparator);
			query.name = {
			    $gte: nameRanges[0].toUpperCase(),
			    $lte: nameRanges[1].toUpperCase()
		  	}
		}

		// Tags Filtering
		tagsString = _.reject(tagsString, function(tag){
			return _.includes(tag, nameRangeSeparator)
		});
		
		for(var i=0; i<tagsString.length;i++){
			tagsRegExp[i] = new RegExp(tagsString[i], 'i');
		}
		
		if(tagsRegExp.length > 0) {
			query.tags = {$all:tagsRegExp};
		}
		else{
			query = _.omit(query, ['tags']);
		}			
	}

	if(query.maxQuantity){
		query.quantity = {$lte: +query.maxQuantity};
	}

	query = _.omit(query, ['querySort', 'queryLimit', 'page', 'maxQuantity', 'properties']);
	
	return query;
}
	
module.exports.buildQuery = buildQuery;