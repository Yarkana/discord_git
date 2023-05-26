//디스코드봇
const { Client, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const axios = require('axios');
const dotenv = requre("detenv")
const qs = require('querystring');
//환경변수 설정
Dotenv.config()

//클라이언트 시작
client.con("레디",()=> {
    console.log("준비 됨")
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
client.on("message", (message) => {
    if (message.content.startsWith("! papa ")) {
        JAPANESWORD = message.content.replace("! papa ", "")
        async function main() {
            const papago = new JapanesPapago({
                NAVER_CLIENT_ID: process.env.client_id,
                NAVER_CLIENT_SECRET: process.env.client_secret,
            })
            const nmtResult = await papago.lookup(JAPANESWORD, { method: "nmt" })
            const feedEmbed = new Discord.MessageEmbed()
                .setColor("#ffc0cb")
                .setTitle(nmtResult)
                .setDescription(`[${JAPANESWORD}]の韓国語ですー！`)
                .setThumbnail(baby.image)
            message.channel.send(feedEmbed)
        }
        main()
    }
    if (message.content.startsWith("! 파파고 ")) {
        KOREANWORD = message.content.replace("! 파파고 ", "")
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
                .setThumbnail(baby.image)
            message.channel.send(feedEmbed)
        }
        
        main()
    }
     // 등장하기 
     if (message.content == "! 상태") {
        const stateEmbed = new Discord.MessageEmbed()

        message.channel.send(stateEmbed)
    }
    //밥먹기
    if (
        (message.content == "! 밥") |
        (message.content == "! 밥묵자") |
        (message.content == "! 먹어") |
        (message.content == "! 먹이")
    ) {
        if (baby.feed > 1) {
            oldBaby()
            EMBEDTEXT = `(´З｀${baby.chin}) 너무 만차나...`
        } else if (baby.feed == 1) {
            feedBaby()
            EMBEDTEXT = `ε=(∀-*${baby.chin}) 꺼억`
        } else if (baby.feed == 0) {
            feedBaby()
            EMBEDTEXT = `((${baby.chin}￣～￣${baby.chin})) 초묵초묵`
        }
        const feedEmbed = new Discord.MessageEmbed()
            .setColor("#ffc0cb")
            .setTitle(EMBEDTEXT)
            .setThumbnail(baby.image)
            .setDescription(`LV.${baby.year}`)
            .setThumbnail(baby.image)
        message.channel.send(feedEmbed)
    }
    // 일어 등장하기
    if (message.content == "! 様子") {
        const stateEmbed = new Discord.MessageEmbed()
            .setColor("#ffc0cb")
            .setTitle(`(${baby.chin}o^～^o${baby.chin}) もはや ${baby.year}kgになりました!`)
        message.channel.send(stateEmbed)
    }
    //일어 밥먹기
    if (
        (message.content == "! ご飯") |
        (message.content == "! ごはん") |
        (message.content == "！　ご飯") |
        (message.content == "！　ごはん") |
        (message.content == "！ご飯") |
        (message.content == "！ごはん")
    ) {
        if (baby.feed > 1) {
            oldBaby()
            EMBEDTEXT = `(´З｀${baby.chin}) もうこれ以上は無理...`
        } else if (baby.feed == 1) {
            feedBaby()
            EMBEDTEXT = `ε=(∀-*${baby.chin}) ゲプッ`
        } else if (baby.feed == 0) {
            feedBaby()
            EMBEDTEXT = `((${baby.chin}￣～￣${baby.chin})) ﾓｸﾞﾓｸﾞ`
        }
        const feedEmbed = new Discord.MessageEmbed()
            .setColor("#ffc0cb")
            .setTitle(EMBEDTEXT)
            .setDescription(`LV.${baby.year}`)
            .setThumbnail(baby.image)
        message.channel.send(feedEmbed)
    }
})


// 여러분의 디스코드 토큰으로 디스코드에 로그인합니다
client.login(process.env.TOKEN)