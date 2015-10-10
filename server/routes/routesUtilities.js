
var buildQuery = function(requestQuery){
	
	var query ={};
	
	var tagsString = requestQuery.tags.split(" ");        
	var tagsRegExp = [];
	
	for(var i=0; i<tagsString.length;i++){
		tagsRegExp[i] = new RegExp(tagsString[i], 'i');
	}
	
	query.tags = {$in:tagsRegExp};
	
	return query;
}
	
module.exports.buildQuery = buildQuery;