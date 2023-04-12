import {
	Client, 
	ActivityType,
	PresenceData
} from "discord.js"

export default function (client: Client) {
	const activity: PresenceData = {
		activities: [
			{
				name: "F@help | feedrum.com",
				type: ActivityType.Watching
			}
		],
		status: "idle"
	}

	client?.user?.setPresence(activity);
}