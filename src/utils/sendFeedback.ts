import { Message, Collection, Attachment, TextChannel } from "discord.js";

import { bot } from "../";

export interface Feedback {
	title: String,
	reason: String,
	description: String,
	attachments: Collection<string, Attachment>
}

export default async function (msg: Message, feedback: Feedback) {
	const attachments = Array.from(feedback?.attachments?.values());

	( bot.channels.cache.get("1095687707075805244") as TextChannel )
		.send({
			content: `Author: ${msg.author.tag}(${msg.author.id})\nTitle: ${feedback?.title}\nReason: ${feedback?.reason}\nDescription: ${feedback?.description}`, 
			files: attachments
		});
}