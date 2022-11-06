const {SlashCommandBuilder, EmbedBuilder, Colors} = require("discord.js");
const fetch = require("node-fetch-commonjs");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("api-stats")
		.setDescription("return feedrum.com/api server status"),
	async execute (interaction) {
		let response = await fetch("https://feedrum.com/api");
		let color, title, fields;


		if (response.status == 200){ 
			color = Colors.Green;
			title = "In API all okay";
			fields = [
				{name: "HTTP status", value: `\`${response.status}\``},
				{name: "Response status text", value: `\`${response.statusText}\``, inline: true}
			];
		} else {
			color = Colors.Red;
			title = "Some error occured";
			fields = [
				{name: "HTTP status", value: `\`${response.status}\``},
				{name: "Response status text", value: `\`${response.statusText}\``, inline: true}
			];

		}

		let embed = new EmbedBuilder()
			.setColor(color)
			.setTitle(title)
			.addFields(fields);

		await interaction.channel.send({embeds: [embed]});
	}
}