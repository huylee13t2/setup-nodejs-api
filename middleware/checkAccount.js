const jwt = require('jsonwebtoken');

checkAccount = async (req, res, next) => {
	try{
		const authorizationHeader = req.headers.oroauth;
		console.log(authorizationHeader);
		let token;
		if (authorizationHeader) {
			token = authorizationHeader.split(" ")[1];
		}
		if(token){
			let decodedToken;
			try{
				decodedToken = jwt.verify(token, 'shhhhh');
			} catch(err){
				return res.status(401).json({ msg: "Error Token!" });
			}

			req.user = decodedToken;
			next();
		} else {
			res.status(401).json({ msg: "Not found JWT" });
		}
	} catch(err){
		res.status(401).json({ msg: "Account is not validate JWT" });
	}
}

module.exports = checkAccount;