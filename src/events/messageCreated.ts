import { Message, Client } from "discord.js";

import { getCommands } from "../commands";

export default async function (message: Message) {
  if (message.author.bot) return;

  const commands = await getCommands();

  const command = message.content.split(" ")[0];

  if (command.startsWith("!")) {
    const commandName = command.split("!")[1];

    const cmd = commands.get(commandName);

    if (cmd != null || undefined) {
      await cmd?.execute(message);
    }
  }
}
