var mongoose = require('mongoose');
var Product = require('./productModel');
var Client = require('./clientModel');

var Schema = mongoose.Schema;


// create a schema
var sellingItemSchema = new Schema({
	product : [mongoose.model('Product').schema],
    quantity : {
        type: Number
    },
	client : [mongoose.model('Client').schema],
    total : {
        type: Number
    },
    revenue: {
        type: Number
    },    
    productPrice :{}
});

// the schema is useless so far
// we need to create a model using it
var SellingItem = mongoose.model('SellingItem', sellingItemSchema);

// make this available to our users in our Node applications
module.exports = SellingItem;