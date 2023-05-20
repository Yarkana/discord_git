const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS","GUIUD_MESSAGES"]});

client.on('ready', () => {
  console.log(`${client.user.tag}에 로그인하였습니다!`);
});

client.on('message', msg => {
  if (msg.content === '야') {
    msg.reply('호!');
  }
});

client.login('MTEwOTQyMjE2MzIyMTU2MTM4NA.Gukdkr.R5aBlcV7hrkmHQ6khfvIB720xQBWBsb5DAnO-4');