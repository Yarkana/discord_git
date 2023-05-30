const { SlashCommandBuilder } = require('discord.js');
const { client } = require('discord.js');
const db = require("../db/db")


const getDiscordChannelIdByName = (channelName, clientName) =>
JSON.parse(JSON.stringify(clientName.channels))
["cache"].map((e) => `${e.name}: ${e.id}`)
.filter((e) => e.includes(channelName));

module.exports = {
	data: new SlashCommandBuilder() //이곳에서 명령을 실행함!
		.setName('임시상시번역')
		.setDescription('상시번역활성화'),
		
	async execute(interaction) {
		if (db.setalwaytrans == true){
			db.setalwaytrans = false
			interaction.reply("꺼짐")
		}
		if (db.setalwaytrans == false){
			db.setalwaytrans = true
			interaction.reply("켜짐")
		}
		
	},
};