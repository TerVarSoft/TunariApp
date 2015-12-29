var mongoose = require('mongoose');
var SellingItem = require('./sellingItemModel');

var Schema = mongoose.Schema;


// create a schema
var sellingSchema = new Schema({
	sellingItems : [mongoose.model('SellingItem').schema],
	client : [mongoose.model('Client').schema],
    total : {
        type: Number
    },
    revenue: {
        type: Number
    },
    date : Date,
});

// the schema is useless so far
// we need to create a model using it
var Selling = mongoose.model('Selling', sellingSchema);

// make this available to our users in our Node applications
module.exports = Selling;