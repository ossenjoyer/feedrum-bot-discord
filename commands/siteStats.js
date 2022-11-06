const {SlashCommandBuilder, EmbedBuilder, Colors} = require("discord.js");
const fetch = require("node-fetch-commonjs");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("site-stats")
		.setDescription("return feedrum.com client status"),
	async execute (interaction) {
		let response = await fetch("https://feedrum.com/");
		let color, title, fields;


		if (response.status == 200){ 
			color = Colors.Green;
			title = "In site all okay";
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