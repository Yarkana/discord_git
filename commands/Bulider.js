const { SlashCommandBuilder } = require('discord.js');
const db = require("../db/db")

module.exports = {
	data: new SlashCommandBuilder() //이곳에서 명령을 실행함!
		.setName('언어변경')
		.setDescription('번역할 언어를 바꿉니다.')
		.addStringOption(option =>
			option.setName('원어')
				.setDescription('번역할 원어')
				.setRequired(true)
				.addChoices(
				{ name: '한국어', value: 'ko' },
				{ name: 'English-영어', value: 'en' },
				{ name: '日本語-일본어', value: 'ja' },
				{ name: '简体中文-중국어간체', value: 'zh-CN' },
				{ name: '繁體中文-중국어번체', value: 'zh-TW' },
			))
		.addStringOption(option =>
			option.setName('번역어')
				.setDescription('번역할 언어')
				.setRequired(true)
				.addChoices(
				{ name: '한국어', value: 'ko' },
				{ name: 'English-영어', value: 'en' },
				{ name: '日本語-일본어', value: 'ja' },
				{ name: '简体中文-중국어간체', value: 'zh-CN' },
				{ name: '繁體中文-중국어번체', value: 'zh-TW' },
			)),
		
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command - 누가 썻는지 알려줍니다
		// interaction.member is the GuildMember object, which represents the user in the specific guild - 특정 서버 안에?
		const SL = interaction.options.getString('원어');
		const TL = interaction.options.getString('번역어');
		db.SL = SL;
		db.TL = TL;
        interaction.reply("원어를 " + db.SL+ "로, 번역어를 " + db.TL+"로 설정했습니다.");
		
	},
};