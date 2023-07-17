import events from "./events/";

import { config } from "dotenv";

import { Client, Events, GatewayIntentBits } from "discord.js";

config();

export const bot: Client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages
  ]
});

bot.on(Events.ClientReady, events.onClientReady);

bot.on(Events.MessageCreate, events.onMessageCreated);

bot.login(process.env.TOKEN);
