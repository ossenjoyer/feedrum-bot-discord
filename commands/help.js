const {SlashCommandBuilder, Colors} = require("discord.js");
const fs = require("fs");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("Show all avaliable commands"),
	async execute (interaction) {
		let files = fs.readdirSync(__dirname).filter(file => file.endsWith(".js"));
		let commandsData = [];

		for (file of files) {
			let commandFile = require(`./${file}`).data;

			commandsData.push({name: `\`${commandFile.name}\``, value: commandFile.description});
		}

		let embed = {
			color: Colors.Green,
			title: "Avaliable commands",
			fields: commandsData
		}

		await interaction.reply({embeds: [embed]});
	}
}