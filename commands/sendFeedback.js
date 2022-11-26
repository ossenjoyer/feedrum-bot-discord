const {SlashCommandBuilder} = require("discord.js");

const {FeedbackModel} = require("../models");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("feedback")
		.setDescription("Send feedback to Feedrum project")
		.addStringOption(option => 
				option
				.setName("title")
				.setDescription("The title of feedback message")
				.setRequired(true
				))
		.addStringOption(option => 
				option
				.setName("feedback_reason")
				.setDescription("choice reason of feedback")
				.setRequired(true)
				.addChoices(
					{name: "App's bug", value: "app_bug"},
					{name: "Wishes for app", value: "app_wishes"},
					{name: "Review", value: "app_review"}
				))
		.addStringOption(option =>
				option
				.setName("description")
				.setDescription("write some description to feedback")
				.setRequired(true
				)),

	async execute (interaction) {
		let 
			title = interaction.options.getString("title"),
			reason = interaction.options.getString("feedback_reason"),
			description = interaction.options.getString("description");

		let feedback = new FeedbackModel({
			FEEDBACK_AUTHOR: interaction.user.id,
			FEEDBACK_TITLE: title,
			FEEDBACK_REASON: reason,
			FEEDBACK_DESCRIPTION: description
		});

		try {
			let feedbackSaved = await feedback.save();
			console.log("[INFO]\n" + feedbackSaved)
			interaction.reply(`Feedback saved successfully`);
		} catch (e) {
			console.log("[ERROR] cannot save feedback to database");
			console.log(e)
			interaction.reply(`Cannot save your feedback`);
		}
	}

}