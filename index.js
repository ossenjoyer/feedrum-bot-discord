const {connect} = require("mongoose");
const {config} = require("dotenv");
const path = require("path");
const fs = require("fs");


const {Client, 
	Events, 
	Collection, 
	GatewayIntentBits, 
	ActivityType
} = require("discord.js");

config();

let bot = new Client({intents: GatewayIntentBits.Guilds});
bot.commands = new Collection();

let commandsPath = path.join(__dirname, "commands");
let commandFiles =  fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (commandFile of commandFiles) {
	const filePath = path.join(commandsPath, commandFile);
	const command = require(filePath);

	if ('data' in command && 'execute' in command) {
		bot.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] in file ${filePath} not found 'data' and 'execute' field, skiping`);
	}
}

bot.on(Events.ClientReady, c => {
	console.log(`[INFO] bot loginned as ${c.user.tag}`);

	let status = {
		activities: [{
			name: "when release",
			type: ActivityType.Watching
		}],
		status: "idle"
	}

	try {
		connect(process.env.MONGO_CONNECT_URL);
		console.log("[INFO] bot connected to database");
	} catch (e){
		console.log("[ERROR] error ocured while connect to database:")
		console.log(e);
	}

	c.user.setPresence(status);

});

bot.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	let command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.log(`[WARNING] command ${interaction.commandName} not found, skiping`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
})

bot.login(process.env.TOKEN);