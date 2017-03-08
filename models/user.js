const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
	email: String,
	firstName: String,
	lastName: String,
	name: String,
	id: String,
	profilePicURL: String,
	like: Array,
	city: String,
	address: String,
	isNewUser: {type: Boolean, default: true}
});

// Export the model
module.exports = mongoose.model('user', userSchema);