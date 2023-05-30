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
		.setDescription('2개의 채널을 지정해 서로 번역합니다. 아직 작동하지 않습니다.')
		.addStringOption(option =>
			option.setName('채널1')
				.setDescription('채널1')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('채널2')
				.setDescription('채널2')
				.setRequired(true))
			.addStringOption(option =>
			option.setName('채널1언어')
				.setDescription('채널1의 언어')
				.setRequired(true)
				.addChoices(
				{ name: '한국어', value: 'ko' },
				{ name: 'English-영어', value: 'en' },
				{ name: '日本語-일본어', value: 'ja' },
				{ name: '简体中文-중국어간체', value: 'zh-CN' },
				{ name: '繁體中文-중국어번체', value: 'zh-TW' },
			))
			.addStringOption(option =>
			option.setName('채널2언어')
				.setDescription('채널2의 언어')
				.setRequired(true)
				.addChoices(
				{ name: '한국어', value: 'ko' },
				{ name: 'English-영어', value: 'en' },
				{ name: '日本語-일본어', value: 'ja' },
				{ name: '简体中文-중국어간체', value: 'zh-CN' },
				{ name: '繁體中文-중국어번체', value: 'zh-TW' },
			)),
		
	async execute(interaction) {
		// 채널 ID를 구할 방법이 필요함

		const C1 = interaction.options.getString('채널1id');
		const C2 = interaction.options.getString('채널2id');
		const L1 = interaction.options.getString('채널1언어');
		const L2 = interaction.options.getString('채널2언어');
		db.chenalN1 = C1;
		db.chenalN2 = C2;
		db.chenal1L = L1;
		db.chenal2L = L2;
        interaction.reply("채널1을 " + C1 +"로, 채널2를 " + C2 + "로 설정하였으며 \n1채널의 언어를 " + L1 + "로, 2채널의 언어를 "+ L2+"로 설정했습니다.");
		
	},
};