const Signin_log = require('../models/Signin_log');

module.exports = (user) => {
	const loggedUser = new Signin_log({
		username: user.username,
		user_id: user._id,
		date: new Date(),
	});

	loggedUser
		.save()
		.catch((e) => console.log(e));
};