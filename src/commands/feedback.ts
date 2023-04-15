import sendFeedback, { Feedback } from "../utils/sendFeedback";

import { Message, Attachment, Collection } from "discord.js";

export default {
	name: "feedback",
	description: "Send feedback to us",
	async execute (msg: Message) {
		const args = msg.content.trim().split(" ").slice(1).join(" ").trim().split(";").filter(e => e != '');

		const description = args.slice(2, args.length).join(" ").trim();

		let feedbackReasons = ["Response", "Bug", "Suggestion"]

		if (args.length != 0) {
			if (args[0].trim().length > 24 || args[0].trim().length < 6)
				return msg.reply("Invalid title length (min. 6 characters; max. 24 characters).");

			if (!(feedbackReasons.includes(args[1].trim())))
				return msg.reply("Invalid feedback reason (use one of the following: `Response|Bug|Suggestion`).");

			if (description.length > 128 || description.length < 12)
				return msg.reply("Invalid description length (min. 12 characters; max. 128 characters).");

			if (msg.attachments.size > 3)
				return msg.reply("Too much attachments (use up to 3 attachments).");

			let feedback: Feedback = {
				title: args[0].trim(),
				reason: args[1].trim(),
				description: description,
				attachments: msg.attachments
			}

			sendFeedback(msg, feedback);
			
			return msg.reply("Feedback successfully sent.");
		} else {
			return msg.reply("Usage: \n```F@feedback title<string>; reason<Response|Bug|Suggestion>; description<string> attachments?[images]```")
		}
	}
}