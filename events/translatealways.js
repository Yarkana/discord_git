const { Events } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,  //이벤트 종류
	async execute(message) {     //주내용
  if (!(message.content.startsWith("?"))) {
            await message.guild.channels.fetch()
            .then(async channels => {
                if (channels.filter(channel => (channel.name.includes("-[temp]")))) {
				
	
	
				}
                
                    })
                
	
    
  }
}
};