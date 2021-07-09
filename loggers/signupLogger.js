const Signup_log = require('../models/Signup_log');

module.exports = (user) => {
	const registeredUser = new Signup_log({
		username: user.username,
		user_id: user._id,
		date: new Date(),
	});

	registeredUser
		.save()
		.catch((e) => console.log(e));
};