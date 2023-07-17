import { Colors } from "discord.js";

export default function SiteStatusEmbed(
  statusCode: number,
  statusText: string
) {
  const title =
      statusCode == 200
        ? "Website is working"
        : "Website experiences some technical issues.",
    color = statusCode == 200 ? Colors.Green : Colors.Red;

  return {
    title,
    color,
    fields: [
      { name: "HTTP Status code", value: statusCode },
      { name: "Status Response", value: statusText },
    ],
  };
}
