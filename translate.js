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

//클라이언트 시작
client.once(Events.ClientReady,()=> {
    console.log("준비 됨");
})
//파파고 클래스
const TRANSLATE_METHODS = {
    nmt: 'nmt',
    smt: 'smt',
};

class Papago {
    constructor(papagoConfig) {
        this.papagoConfig = papagoConfig;
    }

    async lookup(term, { method }) {
        if (this.papagoConfig == null) {
            throw new Error('Papago instance should be initialized with config first');
        } if (term == null) {
            throw new Error('Search term should be provided as lookup arguments');
        }

        const url = method === TRANSLATE_METHODS.smt ? 'language/translate' : 'papago/n2mt';
		const params = qs.stringify({
            source: 'ko',
            target: 'en',
            text: term,
        });
        const papagoConfig = {
            headers: {
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                'X-Naver-Client-Id':this.papagoConfig.NAVER_CLIENT_ID,
                'X-Naver-Client-Secret':this.papagoConfig.NAVER_CLIENT_SECRET,
            },
        };

	const response = await axios.post('https://openapi.naver.com/v1/papago/n2mt', params, papagoConfig);
	console.log(response.data.message.result.translatedText);
        return response.data.message.result.translatedText;
    }
}
//영어 파파고 시작
class JapanesPapago {
    constructor(papagoConfig) {
        this.papagoConfig = papagoConfig;
    }

    async lookup(term, { method }) {
        if (this.papagoConfig == null) {
            throw new Error('Papago instance should be initialized with config first');
        } if (term == null) {
            throw new Error('Search term should be provided as lookup arguments');
        }

        const url = method === TRANSLATE_METHODS.smt ? 'language/translate' : 'papago/n2mt';
		const params = qs.stringify({
            source: 'en',
            target: 'ko',
            text: term,
        });
        const papagoConfig = {
            headers: {
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                'X-Naver-Client-Id':this.papagoConfig.NAVER_CLIENT_ID,
                'X-Naver-Client-Secret':this.papagoConfig.NAVER_CLIENT_SECRET,
            },
        };

	const response = await axios.post('https://openapi.naver.com/v1/papago/n2mt', params, papagoConfig);
	
        return response.data.message.result.translatedText;
    }
}

// 디스코드 메세지 동작                client.on은 봇이 작동하는 동안 이루어질 코드들
client.on("messageCreate", async message => {   //"messageCreate" - 모든 채팅에 반응함, async(자료형) message(변수이름) =>(아마 흐름연산 중에 하나임)
    if (message.content.startsWith("!papa")) {                   // message.content 에는 채팅내용이 들어있음
        ENWORD = message.content.replace("!papa", "");      // 따라서 message.content == "x" 같은 식으로 조건비교가 가능함
        async function main() {
            const papago = new JapanesPapago({
                NAVER_CLIENT_ID: process.env.client_id,            //env파일은 비주얼 스투디오 코드로 생성해서 변수이름 = 토큰 식으로 작성함
                NAVER_CLIENT_SECRET: process.env.client_secret,    //예시 : ID = EEEE
            })
            const nmtResult = await papago.lookup(ENWORD, { method: "nmt" })
            const Embed = new EmbedBuilder()
                .setColor("#ffc0cb")
                .setTitle(nmtResult)
                .setDescription(`[${ENWORD}]에 대한 영어번역입니다`)
            message.channel.send({ embeds: [Embed] })
        }
        main()
       }
    if (message.content.startsWith("!파파고")) {                 //startWith 즉 이 문장으로 시작하는가 라는 조건임
        KOREANWORD = message.content.replace("!파파고", "")
        async function main() {
            const papago = new Papago({
                NAVER_CLIENT_ID: process.env.client_id,
                NAVER_CLIENT_SECRET: process.env.client_secret,
            })
            const nmtResult = await papago.lookup(KOREANWORD, { method: "nmt" })
            const Embed = new EmbedBuilder()
                .setColor("#ffc0cb")
                .setTitle(nmtResult)
                .setDescription(`[${KOREANWORD}]에 대한 한글번역입니다.`)
            message.channel.send({ embeds: [Embed] })
        }
        
        main()
    }
    if (message.content.startsWith("!타겟언어")) {
        LSET = message.content.replace("!타겟언어", "") //1번째인수에 지정된 단어를 넘겨주면 2번째인수의 단어로 교체함 즉 명령어를 제거함
        async function main() {
			langset.targetL = LSET
	}
	main()	
	
	}
})
//슬래쉬 커맨드용 디스코드 작동 코드
client.on(Events.InteractionCreate, async interaction => { //슬래쉬 명령어에 한해 작동합니다!
	if (!interaction.isChatInputCommand()) return; //슬래쉬 명령 이외의 입력이 들어올 경우 해당코드는 작동하지 않습니다. *응용하면 봇채팅은 거르면서 상시 번역은 가능하게?
	const command = interaction.client.commands.get(interaction.commandName);
	console.log(interaction);
	
	if (!command) {
		console.error(`${interaction.commandName}는 존재하지 않는 커맨드입니다.`);
		return;
	}
	//자바의 예외처리
	try {  	
		await command.execute(interaction);
	} catch (error) {  //아무 에러나 다 잡습니다.
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});
// 토큰
client.login(process.env.TOKEN)