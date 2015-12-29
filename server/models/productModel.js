var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var price = new Schema({
	type: String,
	value: Number
});

var location = new Schema({
	type: String,
	value: String
});

// create a schema
var productSchema = new Schema({
	name: {
		type: String,
		unique: true
	},
	category: {
		type: String
	},
	tags: {
		type: [String]
	},
	imageUrl : {
		type: String
	}, 
    quantity: {
        type: Number
    },
    provider: {
        type: String
    },
    buyingPrice: {
        type: price
    },
    locations: [location],
	prices: [price],
	properties: {}
});

// the schema is useless so far
// we need to create a model using it
var Product = mongoose.model('Product', productSchema);

// make this available to our users in our Node applications
module.exports = Product;