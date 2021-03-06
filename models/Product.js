const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
	name: {
		type: String,
		required: true,
		max: 100
	},
	price: {
		type: Number,
		required: true
	}
});
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;