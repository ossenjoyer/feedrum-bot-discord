const {REST, Routes} = require("discord.js");
const {config} = require("dotenv");
const fs = require("fs");

config();

let {CLIENT_ID, TOKEN} = process.env;

let commands = [];

let commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (commandFile of commandFiles) {
	const command = require(`./commands/${commandFile}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({version: '10'}).setToken(TOKEN);

(async () => {
	try {
		console.log(`[INFO] to register ready ${commands.length} slash commands`);
		console.log("[INFO] attemping to register slash commands");

		const data = await rest.put(
			Routes.applicationCommands(CLIENT_ID),
			{body: commands}
		) 

		console.log("[INFO] commands registered succesfully");
	} catch (e) {
		console.log("[ERROR] couldn't register slash commands, reason: \n" + e);
	}
})()