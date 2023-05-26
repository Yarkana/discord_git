//디스코드봇
const { Client, Events, GatewayIntentBits } = require('discord.js'); //최신식으로 변경
const discord = require("discord.js");
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
    constructor(config) {
        this.config = config;
    }

    async lookup(term, { method }) {
        if (this.config == null) {
            throw new Error('Papago instance should be initialized with config first');
        } if (term == null) {
            throw new Error('Search term should be provided as lookup arguments');
        }

        const url = method === TRANSLATE_METHODS.smt ?
            'language/translate' : 'papago/n2mt';

        const params = qs.stringify({
            source: 'ko',
            target: 'en',
            text: term,
        });

        const papagoconfig = {
            baseURL: 'https://openapi.naver.com/v1/',
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'x-naver-client-id': this.config.NAVER_CLIENT_ID,
                'x-naver-client-secret': this.config.NAVER_CLIENT_SECRET,
            },
        };

        const response = await axios.post(url, params, config);

        return response.data.message.result.translatedText;
    }
}
//일본어 파파고 시작
class JapanesPapago {
    constructor(papagoConfig) {
        this.papagoConfig = papagoConfig
    }

    async lookup(term, { method }) {
        if (this.papagoConfig == null) {
            throw new Error("Papago instance should be initialized with papagoConfig first")
        }
        if (term == null) {
            throw new Error("Search term should be provided as lookup arguments")
        }

        const url = method === TRANSLATE_METHODS.smt ? "language/translate" : "papago/n2mt"
        const params = qs.stringify({
            source: "ja",
            target: "ko",
            text: term,
        })
        const papagoConfig = {
            baseURL: "https://openapi.naver.com/v1/",
            headers: {
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "x-naver-client-id": this.papagoConfig.NAVER_CLIENT_ID,
                "x-naver-client-secret": this.papagoConfig.NAVER_CLIENT_SECRET,
            },
        }
        const response = await axios.post(url, params, papagoConfig)
        return response.data.message.result.translatedText
    }
}
// 디스코드 동작(여기서부터 이해안감)
client.on("messageCreate", async message => {   //"messageCreate" - 모든 채팅에 반응함, async(자료형) message(변수이름) =>(아마 흐름연산 중에 하나임)
    if (message.content.startsWith("!papa")) {                   // message.content 에는 채팅내용이 들어있음
        JAPANESWORD = message.content.replace("!papa", "");      // 따라서 message.content == "x" 같은 식으로 조건비교가 가능함
            const papago = new JapanesPapago({
                NAVER_CLIENT_ID: process.env.client_id,
                NAVER_CLIENT_SECRET: process.env.client_secret,
            })
            const nmtResult = await papago.lookup(JAPANESWORD, { method: "nmt" })
            const feedEmbed = new Discord.MessageEmbed()
                .setColor("#ffc0cb")
                .setTitle(nmtResult)
                .setDescription(`[${JAPANESWORD}]の韓国語ですー！`)
        }
        main()
    if (message.content.startsWith("!파파고")) {                 //startWith 즉 이 문장으로 시작하는가 라는 조건임
        KOREANWORD = message.content.replace("!파파고", "")
		await message.reply("이 코드는 작동햇어요");
        async function main() {
            const papago = new Papago({
                NAVER_CLIENT_ID: "ipJ5Vxrkks6XwgINV5Pb",
                NAVER_CLIENT_SECRET: "pV2sEzjZlI",
            })
            const nmtResult = await papago.lookup(KOREANWORD, { method: "nmt" })
            const feedEmbed = new Discord.MessageEmbed()
                .setColor("#ffc0cb")
                .setTitle(nmtResult)
                .setDescription(`[${KOREANWORD}]에 대한 번역입니다.`)
        }
        
        main()
    }
})


// 여러분의 디스코드 토큰으로 디스코드에 로그인합니다
client.login(process.env.TOKEN)