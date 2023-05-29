const { Client, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});
const dotenv = require('dotenv')
const { EmbedBuilder } = require('discord.js'); 

dotenv.config()

client.once('ClientReady',()=> {
  console.log('Logged in as !'); //client.user.tag 부분 색깔이 다름 원래 값을 받아오는 것 수정
});

client.on('MessageCreate',msg => {
  if (msg.content == '야') {
    msg.reply('호!');
  }

  if (msg.content == "프로필") {
    const embed = new EmbedBuilder() // 임배드 디스코드 대답
    .setAuthor("두두 봇","https://www.google.com/url?sa=i&url=https%3A%2F%2Fm.daegu.ac.kr%2Farticle%2FDG56%2Fdetail%2F516278&psig=AOvVaw1z490kWF08uWED777u4er1&ust=1685287867967000&source=images&cd=vfe&ved=0CA4QjRxqFwoTCOCG8tjolf8CFQAAAAAdAAAAABAE")
    .setTitle("두두 봇 프로필") // Author은 제목, 이미지 주소 Title은 큰 제목격 
    .setURL("https://www.daegu.ac.kr/main") // url 주소 클릭하면 이동됨
    .setColor(ABF200) //색깔 선정
    .setDescription("안녕하세요 두두 봇입니다.") // 설명하는 부분, Thumbnail 은 작은 부분
    .setThumbnail("https://blog.kakaocdn.net/dn/JCUxA/btqyzvTvIjU/JFStpmCpt4dn8zCQ6vVCx0/img.jpg")
    .addFields(
      {name: "학교 위치", value: "경상북도 경산시 진량읍 대구대로 201(내리리)",inline: true}, // 이름과 벨륨값을 정해주는 틀 
      {name: "개교일자", value: "1956년 5월 1일(67주년)",inline: true},
      {name: "교훈", value: "큰 뜻을 품어라",inline: true},
      {name: "건학정신", value: "사랑 빛 자유",inline: true}
    )
    
    msg.channel.send(embed);
  }
})

client.login(process.env.TOKEN)