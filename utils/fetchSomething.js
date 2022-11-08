const fetch = require("node-fetch-commonjs");
const {Colors} = require("discord.js");


let fetchSomething = async (url) => {
	try {
		let response = await fetch(url);

		if (response.status == 200){
			return { 
				color: Colors.Green,
				title: "In site all okay",
				fields: [
					{name: "HTTP status", value: `\`${response.status}\``},
					{name: "Response status text", value: `\`${response.statusText}\``, inline: true}
				]
			}
		} else {
			return {
				color: Colors.Red,
				title: "Some error occured",
				fields: [
					{name: "HTTP status", value: `\`${response.status}\``},
					{name: "Response status text", value: `\`${response.statusText}\``, inline: true}
				]
			}

		}
	} catch (e) {
		console.log(e);
		return {
			color: Colors.Red,
			title: "Cannot get site",
			fields: [
				{name: "Reason", value: e.message}
			]
		}
	}
}

module.exports = {
	fetchSomething: fetchSomething
}