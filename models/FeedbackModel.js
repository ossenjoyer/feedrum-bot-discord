const {Schema, model} = require("mongoose");

let feedbackSchema = new Schema({
	FEEDBACK_AUTHOR: {
		type: String,
		requred: true
	},
	FEEDBACK_TITLE: {
		type: String,
		required: true
	},
	FEEDBACK_REASON: {
		type: String,
		required: true
	},
	FEEDBACK_DESCRIPTION: {
		type: String,
		required: true
	}
}, {versionKey: false});

module.exports = Feedback = model("feedbacks", feedbackSchema);