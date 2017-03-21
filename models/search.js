const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const searchSchema = new Schema({
	_id: String,
	value: Object 
});

// Export the model
module.exports = mongoose.model('search', searchSchema);