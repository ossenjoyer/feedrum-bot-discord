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
				title: "Website is working!",
				fields: [
					{name: "HTTP Status", value: `\`${response.status}\``},
					{name: "Response", value: `\`${response.statusText}\``, inline: true}
				]
			}
		} else {
			return {
				color: Colors.Red,
				title: "Website experiences some technical issues.",
				fields: [
					{name: "HTTP Status", value: `\`${response.status}\``},
					{name: "Response", value: `\`${response.statusText}\``, inline: true}
				]
			}
		}
	} catch (e: any) {
		console.log(e);
		return {
			color: Colors.Red,
			title: "Website experiences some errors.",
			fields: [
				{name: "Error occurred", value: `\`${e.message}\``}
			]
		}
	}
}