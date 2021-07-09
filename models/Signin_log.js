const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const signinLogSchema = new Schema({
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

module.exports = mongoose.model('signin_log', signinLogSchema);