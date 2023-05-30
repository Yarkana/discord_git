/*
const { Events } = require('discord.js');
const db = require("../db/db")

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
	async execute(message) {     //주내용
  if ((message.content.startsWith("?") == false) && db.setalwaytrans == true) {
	KOREANWORD = message.content()
        async function main() {
            const papago = new Papago({
                NAVER_CLIENT_ID: process.env.client_id,
                NAVER_CLIENT_SECRET: process.env.client_secret,
            })
            const nmtResult = await papago.lookup(KOREANWORD, { method: "nmt" })
            message.channel.send(nmtResult)
        }
        
        main()
}

},
}
*/