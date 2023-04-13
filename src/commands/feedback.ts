import sendFeedback, { Feedback } from "../utils/sendFeedback";

import { Message, Attachment, Collection } from "discord.js";

export default {
	name: "feedback",
	description: "send feedback to us",
	async execute (msg: Message) {
		const args = msg.content.trim().split(" ").slice(1).join(" ").trim().split(",").filter(e => e != '');

		const description = args.slice(2,array.length).join(" ").trim();

		let feedbackReasons = ["Response", "Bug", "Suggestion"]

		if (args.length != 0) {
			if (args[0].trim().length > 24 || args[0].trim().length < 6)
				return msg.reply("invalid title length (6 mininum and 24 maximum)");

			if (!(feedbackReasons.includes(args[1].trim())))
				return msg.reply("invalid feedback reason (available `Response|Bug|Suggestion`)");

			if (description.length > 128 || description.length < 12)
				return msg.reply("invalid description length (12 minimum, 128 maximum)");

			if (msg.attachments.size > 3)
				return msg.reply("too much attachments (3 maximum)");

			let feedback: Feedback = {
				title: args[0].trim(),
				reason: args[1].trim(),
				description: description,
				attachments: msg.attachments
			}

			sendFeedback(msg, feedback);
			
			return msg.reply("feedback succesfully sended");
		} else {
			return msg.reply("Usage: \n```F@feedback title<string>, reason<Response|Bug|Suggestion>, description<string> attachments?[images]```")
		}
	}
}