const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		max: 100
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true
	},
	token: {
		type: String,
	}
});
const User = mongoose.model("User", UserSchema);
module.exports = User;