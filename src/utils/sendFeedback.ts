import { Message, Collection, Attachment, TextChannel } from "discord.js";

import { bot } from "../";
import { Feedback } from "./feedback";
import FeedbackEmbed from "../embeds/FeedbackEmbed";

// export interface Feedback {
// 	title: String,
// 	reason: String,
// 	description: String,
// 	attachments: Collection<string, Attachment>
// }

export default async function (msg: Message, feedback: Feedback) {
  const attachments = Array.from(feedback?.attachments?.values());

  const embed = FeedbackEmbed(feedback);

  (bot.channels.cache.get("1095687707075805244") as TextChannel).send({
    embeds: [embed],
    files: attachments,
  });
}
