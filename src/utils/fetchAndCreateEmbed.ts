import { Colors, APIEmbedField } from "discord.js";
import SiteStatusEmbed from "../embeds/SiteStatusEmbed";

export default async function (url: URL) {
  try {
    const response = await fetch(url);

    return SiteStatusEmbed(response.status, response.statusText);
  } catch (e: any) {
    console.log(e);
    return {
      color: Colors.Red,
      title: "Website experiences some errors.",
      fields: [{ name: "Error occurred", value: `\`${e.message}\`` }],
    };
  }
}
