import sendFeedback from "../utils/sendFeedback";
import { Feedback } from "../utils/feedback";

import { Message } from "discord.js";

export default {
  name: "feedback",
  description: "Send feedback to us",
  async execute(msg: Message) {
    const args = msg.content
      .trim()
      .split(" ")
      .slice(1)
      .join(" ")
      .trim()
      .split(";")
      .filter((e) => e != "");

    const description = args.slice(2, args.length).join(" ").trim();

    if (args.length != 0) {
      try {
        const feedback = new Feedback(
          msg.author.username,
          args[1].trim(),
          args[0].trim(),
          description.trim(),
          msg.attachments
        );

        sendFeedback(msg, feedback);
      } catch (error: any) {
        return msg.reply(error.message);
      }

      return msg.reply("Feedback successfully sent.");
    } else {
      return msg.reply(
        "Usage: \n```F@feedback title<string>; reason<Response|Bug|Suggestion>; description<string> attachments?[images]```"
      );
    }
  }
};
