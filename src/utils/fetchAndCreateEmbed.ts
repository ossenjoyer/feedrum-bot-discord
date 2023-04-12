import { Colors, APIEmbedField } from "discord.js";

export interface Fetched {
	color: number,
	title: string,
	fields: Array<APIEmbedField>
}

export default async function (url: URL): Promise<Fetched> {
	try {
		const response = await fetch(url);

		if (response?.status == 200) {
			return {
				color: Colors.Green,
				title: "on site all okay",
				fields: [
					{name: "HTTP status", value: `\`${response.status}\``},
					{name: "Response status text", value: `\`${response.statusText}\``, inline: true}
				]
			}
		} else {
			return {
				color: Colors.Red,
				title: "on site some trubles",
				fields: [
					{name: "HTTP status", value: `\`${response.status}\``},
					{name: "Response status text", value: `\`${response.statusText}\``, inline: true}
				]
			}
		}
	} catch (e: any) {
		console.log(e);
		return {
			color: Colors.Red,
			title: "on site some trubles",
			fields: [
				{name: "Error ocured", value: `\`${e.message}\``}
			]
		}
	}
}