const { SlashCommandBuilder } = require('discord.js');
const { client } = require('discord.js');
const db = require("../db/db")


const getDiscordChannelIdByName = (channelName, clientName) =>
JSON.parse(JSON.stringify(clientName.channels))
["cache"].map((e) => `${e.name}: ${e.id}`)
.filter((e) => e.includes(channelName));

module.exports = {
	data: new SlashCommandBuilder() //이곳에서 명령을 실행함!
		.setName('채널지정')
		.setDescription('2개의 채널을 지정해 서로 번역합니다. 아직 작동하지 않습니다.'),
		
	async execute(interaction) {
		if (db.setalwaytrans == True){
			db.setalwaytrans = False
		}
		if (db.setalwaytrans == False){
			db.setalwaytrans = True
		}
		
	},
};