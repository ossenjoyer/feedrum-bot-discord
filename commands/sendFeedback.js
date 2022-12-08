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

		if (!title || !description)
			return interaction.reply('cannot get title or description');

		if (title.length < 6 || title.length > 16)
			return interaction.reply('Your title so smally or longer');


		if (description.length < 6 || description.length > 64)
			return interaction.reply('Your description so smally or longer');

		let feedback = new FeedbackModel({
			FEEDBACK_AUTHOR: interaction.user.id,
			FEEDBACK_TITLE: title,
			FEEDBACK_REASON: reason,
			FEEDBACK_DESCRIPTION: description
		});

		try {
			let feedbackSaved = await feedback.save();
			console.log("[INFO]\n" + feedbackSaved)
			return interaction.reply(`Feedback saved successfully`);
		} catch (e) {
			console.log("[ERROR] cannot save feedback to database");
			console.log(e)
			return interaction.reply(`Cannot save your feedback`);
		}
	}

}