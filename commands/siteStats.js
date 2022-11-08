const {SlashCommandBuilder, EmbedBuilder, Colors} = require("discord.js");
const fetch = require("node-fetch-commonjs");

const {fetchSomething} = require("../utils/");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("site-stats")
		.setDescription("return feedrum.com client status"),
	async execute (interaction) {
		let embed = await fetchSomething("https://feedrum.com");

		await interaction.reply({embeds: [embed]});
	}
}