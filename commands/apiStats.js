const {SlashCommandBuilder, EmbedBuilder, Colors} = require("discord.js");
const fetch = require("node-fetch-commonjs");

const {fetchSomething} = require("../utils");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("api-stats")
		.setDescription("return feedrum.com/api server status"),
	async execute (interaction) {
		let embed = await fetchSomething("https://feedrum.com/api");

		await interaction.reply({embeds: [embed]});
	}
}