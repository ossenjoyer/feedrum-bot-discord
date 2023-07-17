import fetchAndEmbed from "../utils/fetchAndCreateEmbed";
import { Message, APIEmbed } from "discord.js";

export default {
  name: "status",
  description: "Check website status",
  async execute(msg: Message) {
    const embed = (await fetchAndEmbed(
      new URL("https://feedrum.com")
    )) as APIEmbed;

    msg.reply({ embeds: [embed] });
  },
};
