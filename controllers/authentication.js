const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user){
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

exports.signin = function(req, res, next){
	// User has already hed their email and password auth'd
	// We just need to give them a token
	res.send({ token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next){
	const email = req.body.email;
	const password = req.body.password;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;


	if(!email || !password) {
		return res.status(422).send({error: "You must provide email and password"})
	}

	// See if a user with the given email exists
	User.findOne({ email: email }, function(err, existingUser){
		if(err){ return next(err); }

		// If a user with email does exits, return an error
		if(existingUser){
			return res.status(422).send({ error: "Email is in use" });
		}

		// If a user with email dos NOT exists, create and save user record
		const user = new User({
			email: email,
			password: password,
			lastName: lastName,
			firstName: firstName

		})

		user.save(function(err){
			if(err) { return next(err) }
		})

		// Respond to request indicating the user was created
		res.json({ token: tokenForUser(user) })

	})

}