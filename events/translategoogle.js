/*
const { Events } = require('discord.js');
const translate = require('google-translate-api');
const Discord = require(`discord.js`);
const { EmbedBuilder } = require('discord.js'); 
module.exports = {
	name: Events.MessageCreate,  //이벤트 종류
	async execute(message) {
	if (message.content.startsWith("!g")) {
    let args = message.content.split(/[ ]+/);
    let lang = args[1];
    let suffix = args.slice(2).join(' ');
    translate('hello', {from: 'en', to: 'ko'}).then(res => {
        let embed = new EmbedBuilder()
        .setTitle(" ")
        .setColor(`#4885ed`)
        .setAuthor(`Language detected: "${lang}"`, `http://nyamato.me/i/kbfuj.png`)
        .setDescription(`**Original**: ${suffix}\n**Translation**: ${res.text}`)
        .setTimestamp()
        .setFooter('API Lantancy is ' + `${Date.now() - message.createdTimestamp}` + ' ms', message.author.displayAvatarURL);
    return message.channel.send({ embeds: [embed] });
    });
    }
}
};
*/