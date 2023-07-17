import { getCommands } from "./";

import { Message, Colors, APIEmbedField } from "discord.js";

interface HelpEmbed {
  color: number;
  title: string;
  fields: Array<APIEmbedField>;
}

export default {
  name: "help",
  description: "Display help for commands",
  async execute(msg: Message) {
    let helpEmbed: HelpEmbed = {
      color: Colors.Green,
      title: "Available commands",
      fields: []
    };

    const commands = await getCommands();

    for (const command of commands.values()) {
      helpEmbed.fields.push({
        name: command?.name,
        value: command?.description
      });
    }

    msg.reply({ embeds: [helpEmbed] });
  }
};
