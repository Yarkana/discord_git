const { Events } = require('discord.js');
const CDate = new Date()


module.exports = {
	name: Events.MessageCreate,  //이벤트 종류
	async execute(message) {     //주내용
		if (message.content.startsWith("!시간")) { 
			message.channel.send("현재 한국시간: "+CDate.getHours()+":"+CDate.getMinutes()+":"+CDate.getSeconds())
			}
		}
};