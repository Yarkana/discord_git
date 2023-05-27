//디스코드봇
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
	console.log(response.data.message.result.translatedText);
        return response.data.message.result.translatedText;
    }
}
// 디스코드 동작                 client.on은 봇이 작동하는 동안 이루어질 코드들
client.on("messageCreate", async message => {   //"messageCreate" - 모든 채팅에 반응함, async(자료형) message(변수이름) =>(아마 흐름연산 중에 하나임)
    if (message.content.startsWith("!papa")) {                   // message.content 에는 채팅내용이 들어있음
        JAPANESWORD = message.content.replace("!papa", "");      // 따라서 message.content == "x" 같은 식으로 조건비교가 가능함
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
})


// 토큰
client.login(process.env.TOKEN)