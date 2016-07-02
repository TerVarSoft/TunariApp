var bcrypt = require('bcrypt-nodejs');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'worker', 'public']},
});

userSchema.pre('save', function(next){
	var user = this;

	// Not hash if password empty or not modified
	if(user.password != "" && !user.isModified('password')) return next();

	bcrypt.genSalt(10, function(err, salt) {
		if(err) return next(err);

		bcrypt.hash(user.password, salt, null, function(err, hash){
			if (err) return next(err);

			user.password = hash;
			next();
		}) 
	})
})

// Custom methods
userSchema.methods.toJSON = function() {
	var user = this.toObject();
	delete user.password;
	
	return user;
}

userSchema.methods.comparePasswords = function(password, callback) {
	bcrypt.compare(password, this.password, callback);

}
// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;


