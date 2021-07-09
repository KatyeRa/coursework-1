const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const signupLogSchema = new Schema({
	username: {
		type: String,
		required: true,
	},

	user_id: {
		type: Object,
		required: true,
	},

	date: {
		type: Date,
		required: true,
	},
});

module.exports = mongoose.model('signup_log', signupLogSchema);