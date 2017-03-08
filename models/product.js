var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
	title: { type: String, required: true },
	image: { type: String, required: true, default: "https://imgs-steps-dragoart-386112.c.cdn77.org/how-to-draw-a-simple-baby-step-6_1_000000025457_3.jpg" },
	description: { type: String, required: true },
	categories: { type: Array },
	price: { type: Number, required: true, min: 0 },
	seller: {},	
	buyer: {},
	like: Array,
	available: {type: Boolean, default: true },
	age: { type: String, required: true },
	modified: { type: Date, default: Date.now },
	location: { type: String, required: true }
})

module.exports = mongoose.model('product', ProductSchema);