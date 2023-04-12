import path from "path";
import fs from "fs";

import { Message, PartialMessage } from "discord.js";

type executeFn = (msg: Message) => Promise<void>

interface CommandData {
	name: string,
	description: string,
	execute: executeFn
}

export async function getCommands () {
	const commands: Map<String, CommandData> = new Map<String, CommandData>();

	const commandsFolderPath = path.join(process.cwd(), "build/commands/");

	const commandFiles = fs.readdirSync(commandsFolderPath).filter(file => file.split(".")[0] != "index");

	const commandsData = commandFiles.map(async file => {
		const {default: module} = await import(`./${file}`);

		return module;
	});

	for await (const commandData of commandsData) {
		commands.set(commandData.name, commandData);
	}

	return commands;
}