const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const localStorage = require('localStorage');

const User = require("../models/User");

getUser = async (req, res, next) => {
	let user = await User.find({}).exec();

	return res.status(200).status(user);
};

register = async (req, res, next) => {
	try {
		const { username, password, email } = req.body;

		hashedPassword = passwordHash.generate(password);

		user = new User({
			username,
			password: hashedPassword,
			email,
		});
		await user.save();
		user = user.toObject();
		delete user.password;

		return res.status(200).json(user);
	} catch (err){
		next(err);
	}
};

login = async (req, res, next) => {
	try{
		const { username, password } = req.body;

		let user = await User.findOne({ username }).exec();

		if(!user) {
			return res.status(401).status({ msg: "Username is incorrect" });
		}

		// check password
		const hashedPassword = passwordHash.generate(password);
		const checkPassword = passwordHash.isHashed(user.password);
		if(!checkPassword){
			return res.status(401).status({ msg: "Password is incorrect" });
		}

		// create jwt token
		const token = jwt.sign({ _id: user._id }, 'shhhhh');

		user.token = token;
		user.save();

		user = user.toObject();
		delete user.password;

		// localStorage.setItem("_token", token);

		res.set("oroauth", `Bearer ${token}`);

		return res.status(200).json(user);
	} catch (err) {
		next(err);
	}
}

module.exports = {
	getUser,
	register,
	login,
}