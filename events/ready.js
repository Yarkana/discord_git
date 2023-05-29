const { Events } = require('discord.js');
const db = require("../db/db")

module.exports = {
	name: Events.ClientReady,    //이벤트의 종류를 적습니다
	once: true,                  //한번만 실행하게하는 값!
	execute(client) {
    	console.log("준비 됨");
    	db.SL = "ko" //초기화
    	db.TL = "en"
	},
};