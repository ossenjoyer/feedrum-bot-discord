import { Message, PartialMessage } from "discord.js";

export default {
	name: "ping",
	description: "Check bot latency",
	async execute (msg: Message) {
		await msg.reply("PONG!");
	}
}