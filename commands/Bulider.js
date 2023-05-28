const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('언어변경')
		.setDescription('번역할 언어를 바꿉니다.'),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command - 누가 썻는지 알려줍니다
		// interaction.member is the GuildMember object, which represents the user in the specific guild - 특정 서버 안에?
		await interaction.reply('${interaction.user.username}에 의해 실행되었습니다');
	},
};