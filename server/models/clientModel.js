var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var clientSchema = new Schema({
	name : {
		type: String
	},
    phone : {
        type: Number
    },
    cellphone : {
        type: Number
    },
	address : {
		type: String
	},
    sampleBook : {
        type: Boolean  
    },
    productSamples : {}
});

// the schema is useless so far
// we need to create a model using it
var Client = mongoose.model('Client', clientSchema);

// make this available to our users in our Node applications
module.exports = Client;