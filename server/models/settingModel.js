var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var settingSchema = new Schema({
    key : {
        type: String
    },
    value : {
        type: String
    }
});

// the schema is useless so far
// we need to create a model using it
var Setting = mongoose.model('Setting', settingSchema);

// make this available to our users in our Node applications
module.exports = Setting;