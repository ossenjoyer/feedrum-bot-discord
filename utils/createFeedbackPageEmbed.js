const {Colors} = require("discord.js");

let createEmbed = async (feedback) => {
	let id = feedback._id;
	let title = feedback.FEEDBACK_TITLE;
	let description = feedback.FEEDBACK_DESCRIPTION;

	let reasons;

	switch (feedback.FEEDBACK_REASON) {
		case 'app_bug': reason = "App's bug";
		case 'app_wishes': reason = "Wishes";
		case 'app_review': reason = "Review";
	}

	return {
		color: Colors.Green,
		title: "Feedback",
		fields: [
			{name: "Reason", value: reason},
			{name: "Title", value: title},
			{name: "Description", value: description}
		]
	}
}

module.exports = {
	createFeedbackPageEmbed: createEmbed
}