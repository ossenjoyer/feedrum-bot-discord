import { Message, PartialMessage } from "discord.js";

export default {
  name: "ping",
  description: "Check bot latency",
  async execute(msg: Message) {
    await msg.reply(
      `Message delivery time ${Date.now() - msg.createdTimestamp}ms`
    );
  },
};
