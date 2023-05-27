const { Client, MessageEmbed: RichEmbed, GatewayIntentBits, Events } = require('discord.js');
const config = require("./config.json");
const axios = require('axios');
const dotenv = require("dotenv")   //npm i dotenv로 설치할 것
const { Util } = require('discord.js')

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

dotenv.config();
//This is what the bot looks for if set to ? then ?fr Test will translate to French
const prefix = "?"; 

//DeepL authorization key
let auth_key = '2c6f206ec8mshc81cd335a9f5c6fp1e9cb9jsn1b74288dc09c';

//Use this to restrict the ability to translate to users with this role leave as '' to disable user role checking
const accessRole = '';

//Free Version
const deeplApi = 'https://deepl-translator.p.rapidapi.com/translate';

//Paid Version
//const deeplAPI = "https://api.deepl.com/v2/translate";
client.once(Events.ClientReady,()=> {
    console.log("준비 됨");
})

client.on('messageCreate', async message => {        //디스코드 시작
  if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const command = commandBody.split(' ')[0];
    const messageBody = commandBody.replace(command,'');
    
    if (command === "ping") {
	    const timeTaken = Date.now() - message.createdTimestamp;
	    message.reply(`Pong! This message had a latency of ${timeTaken}ms. `);
    }else if(command === "test"){
	    message.reply(` Message: ` + messageBody);
	    const options = {
	    		  method: 'POST',
	    		  url: 'https://deepl-translator.p.rapidapi.com/translate',
	    		  headers: {
	    		    'content-type': 'application/json',
	    		    'X-RapidAPI-Key': '2c6f206ec8mshc81cd335a9f5c6fp1e9cb9jsn1b74288dc09c',
	    		    'X-RapidAPI-Host': 'deepl-translator.p.rapidapi.com'
	    		  },
	    		  data: {
	    		    text: 'This is a example text for translation.',
	    		    source: 'EN',
	    		    target: 'ZH'
	    		  }
	    		};

	    		try {
	    			const response = await axios.request(options);
	    			console.log(response.data);
	    		} catch (error) {
	    			console.error(error);
	    		}
    }else if(command === "help"){
	    showHelp(message,"");
    } else{
    	if (accessRole == "" || message.member.roles.cache.some(role => role.name.toLowerCase() === accessRole.toLowerCase())) {
            const target_lang = command;
            let transMessage = Util.cleanContent(message.content, message);

            //todo clean this up
            transMessage = transMessage.replace(command,'');
            transMessage = transMessage.replace(prefix,'');

            post(transMessage, target_lang).then(response => {
                if (response.data.translations.length === 1){
                    embedReply(message,response.data.translations[0],target_lang,messageBody);
                }else{
                    message.channel.send("ERROR: " + messageBody);
                }
            });
        }else{
            message.channel.send("Access Denied: "+ message.author.username +"\nMissing Required role of "+ accessRole);
        }
    }
});

const post = (message, lang) => {         //전송할 헤더값 
  return axios.post(deeplApi +
    'auth_key=' + auth_key +'&' + 
    'text=' + encodeURIComponent(message) + '&' +
    'target_lang=' + lang)
}

const embedReply =(message, translations, lang, org) => {
    const exampleEmbed = new RichEmbed()
	.setColor('#0099ff')
	.setTitle(translations.text)
	.setAuthor(message.author.username, message.author.avatarURL())
	.setDescription(org)
	.setTimestamp()
	.setFooter(translations.detected_source_language.toUpperCase() + ' -> ' + lang.toUpperCase()+ " "+ org.length + " to " + translations.text.length + " characters");
    message.delete();
    message.channel.send({ embeds: [exampleEmbed] });
}

const showHelp =(message) => {
    const exampleEmbed = new RichEmbed()
        .setColor('#0099ff')
        .setTitle("Translation-Bot Help")
        .setDescription("This bot is used to translate text\n\nType `" + prefix +"de Hello` to translate Hello to German\n\nMost launguages are supported, change `de` to one of the supported launguage codes and try it\n\nBG - Bulgarian\nCS - Czech\nDA - Danish\nDE - German\nEL - Greek\nEN - English\nES - Spanish\nET - Estonian\nFI - Finnish\nFR - French\nHU - Hungarian\nIT - Italian\nJA - Japanese\nLT - Lithuanian\nLV - Latvian\nNL - Dutch\nPL - Polish\nPT - Portuguese (all Portuguese varieties mixed)\nRO - Romanian\nRU - Russian\nSK - Slovak\nSL - Slovenian\nSV - Swedish\nZH - Chinese\n")
        .setFooter("© 2022 RRiVEN LLC");
    message.delete();
    message.channel.send({ embeds: [exampleEmbed] });

}
client.login(process.env.TOKEN);