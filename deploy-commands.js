const { REST, Routes, client } = require('discord.js');                //명령배포스크립트임
const fs = require('node:fs');                                         //commands 폴더에 빌더와 같은 명령어빌더를 추가해서 슬래쉬 명령어로 등록하는 것!
const path = require('node:path');                                     //interaction 관련한 별개의 양식이 필요함으로 translate에서 확인하길 바람
const dotenv = require("dotenv")   //npm i dotenv로 설치할 것             //이 문서 자체는 특별한 경우가 아니면 건들이지 말것
const commands = [];                                                   //commands폴더를 하위폴더로 나누고 싶다면 이슈에 개시할 것 또는 별개로 공부해서 올려도 됨
// Grab all the command files from the commands directory you created earlier
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

dotenv.config()

for (const file of commandFiles) {                  
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		}
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.TOKEN);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.discord_client_id, process.env.guildid), 
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();