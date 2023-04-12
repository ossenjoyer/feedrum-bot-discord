import fetchAndEmbed, {Fetched} from "../utils/fetchAndCreateEmbed";
import {
	Message,
	EmbedBuilder,
	APIEmbedField,
	JSONEncodable,
	PartialMessage
} from "discord.js";

export default {
	name: "status",
	description: "shows site status",
	async execute (msg: Message) {
		const embed: Fetched = await fetchAndEmbed(new URL("https://feedrum.com"));

		msg.reply({ embeds: [embed] });
	}
}