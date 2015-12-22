var _ = require('lodash');

var buildQuery = function(requestQuery){
	
	var query = requestQuery;
	
	if (query.tags){
		var tagsString = requestQuery.tags.split(" ");        
		var tagsRegExp = [];
		
		for(var i=0; i<tagsString.length;i++){
			tagsRegExp[i] = new RegExp(tagsString[i], 'i');
		}
		
		query.tags = {$in:tagsRegExp};
	}

	query = _.omit(query, ['querySort', 'queryLimit']);
	
	return query;
}
	
module.exports.buildQuery = buildQuery;