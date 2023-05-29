//명령처리기
const fs = require('node:fs');
const path = require('node:path');
//디스코드봇
const { Collection } = require('discord.js');
const { Client, Events, GatewayIntentBits } = require('discord.js'); //최신식으로 변경
const { EmbedBuilder } = require('discord.js');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});
const axios = require('axios');   //npm i axios로 설치할것
const dotenv = require("dotenv")   //npm i dotenv로 설치할 것
const qs = require('querystring');  //설치안해도 작동했음. 필요시 설치
 var request = require('request');

//명령어 처리기 경로작성입니다
const commandsPath = path.join(__dirname, 'commands'); //패스에 커맨드폴더를 넣습니다. 커맨드 하위폴더로 연결도 가능하며 종류별로 나눌 수 있으나, 하위폴더가 존재할 경우
                                                       //그 위의 상위 폴더는 아무런 js파일도 존재하지 않아야합니다. index파일이 존재하는 루트는 예외
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); //커맨드패스를 바탕으로 내부에서 js로 끝나는 파일을 읽습니다.

client.commands = new Collection(); //상속을 통해 사용가능한 자바코드를 확장시킵니다.

//명령어 처리기가 사용할 파일을 찾습니다.
for (const file of commandFiles) { //컬렉션 전용 반복문입니다.
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);	
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) { //해당 명령어 파일이 빌더를 사용햇는지, 인터렉션을 반환하는지 확인합니다
		client.commands.set(command.data.name, command);
	} else {  //없으면 오류가 발생하기때문에 이를 미리 알려줍니다!
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);  
	}
}
 
 //변수선언
const langset = {
	sourceL: '',
	targetL: ''
} 

//환경변수 설정
dotenv.config()

//이벤트들 호출
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// 토큰
client.login(process.env.TOKEN)