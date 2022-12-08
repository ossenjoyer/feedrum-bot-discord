const {SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events} = require("discord.js");
const {config} = require("dotenv");

const {createFeedbackPageEmbed} = require("../utils");
const {FeedbackModel} = require("../models");

config();

module.exports = {
	data: new SlashCommandBuilder()
		.setName("feedbacks")
		.setDescription("shows all feedbacks (only for creators")
		.addNumberOption(option => 
			option
				.setName("page_id")
				.setDescription("set page id (morest than 0)")
				.setRequired(true)
		),

	async execute (interaction) {
		if (interaction.user.id !== process.env.DEVELOPER_ID) return;

		let pageId = interaction.options.getNumber("page_id");

		let row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId("left")
					.setLabel("Previous")
					.setStyle(ButtonStyle.Primary),
				new ButtonBuilder()
					.setCustomId("right")
					.setLabel("Next")
					.setStyle(ButtonStyle.Primary)
			);

		let filter = i => i.customId === 'left' || 'right' && i.user.id === process.env.DEVELOPER_ID;

		let collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

		let feedbacks = await FeedbackModel.find();

		let feedback = feedbacks[pageId];

		if (!feedback)
			return interaction.reply({ content: "cannot get page", components: [], ephemeral: true });

		let embedPage = await createFeedbackPageEmbed(feedback);


		collector.on('collect', async i => {
			if (i.customId === 'left'){
				pageId -= 1;
				feedback = feedbacks[pageId];

				if (!feedback)
					return i.update({ content: "cannot get page", embeds: [], components: [], ephemeral: true });

				embedPage = await createFeedbackPageEmbed(feedback);

				return await i.update({ embeds: [embedPage], components: [row], ephemeral: true });
			}
			else if (i.customId === 'right'){
				pageId += 1;
				feedback = feedbacks[pageId];

				if (!feedback)
					return i.update({ content: "cannot get page", embeds: [], components: [], ephemeral: true });

				embedPage = await createFeedbackPageEmbed(feedback);

				return await i.update({ embeds: [embedPage], components: [row], ephemeral: true });
			}
		});

		await interaction.reply({ embeds: [embedPage], components: [row], ephemeral: true });
	}
}
