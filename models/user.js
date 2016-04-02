var mongodb = require('mongodb');
var mongoose = require('mongoose');

var db = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/schedule';
db.connect(url, function(err, db){
	if (err) {
		console.log("Fang" , err);
	} else {
		console.log('Connection established to ', url);

	};
});
// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index: true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	},
	profileimage: {
		type: String
	}
});

var User = module.exports = mongoose.model('User', UserSchema);
module.exports.createUser = function(newUser, callback){
	newUser.save(callback);
}