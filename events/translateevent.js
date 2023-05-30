const { Events } = require('discord.js');
const axios = require('axios');   //npm i axios로 설치할것
const dotenv = require("dotenv")   //npm i dotenv로 설치할 것
const qs = require('querystring');  //설치안해도 작동했음. 필요시 설치
const { EmbedBuilder } = require('discord.js'); 
const db = require("../db/db")

dotenv.config()

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

		const params = qs.stringify({
            source: db.SL,
            target: db.TL,
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

module.exports = {
	name: Events.MessageCreate,  //이벤트 종류
	async execute(message) {
		if (message.author.bot) return;
		if (message.content.startsWith("!papa")) {                   // message.content 에는 채팅내용이 들어있음
        ENWORD = message.content.replace("!papa", "");      // 따라서 message.content == "x" 같은 식으로 조건비교가 가능함
        async function main() {
            const papago = new Papago({
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

},
}