const { Events } = require('discord.js');
const { EmbedBuilder } = require('discord.js'); 

module.exports = {
	name: Events.MessageCreate,  //이벤트 종류
	async execute(message) {     //주내용
  if (message.content == "프로필") {
    const embed = new EmbedBuilder() // 임배드 디스코드 대답
    	.setTitle("번역 봇 프로필") // Author은 제목, 이미지 주소 Title은 큰 제목격 
    	.setURL("https://discord.com/api/oauth2/authorize?client_id=1109755131639103508&permissions=8&scope=bot") // url 주소 클릭하면 이동됨
    	.setColor(0xABF200) //색깔 선정
    	.setDescription("안녕하세요 번역 봇입니다.") // 설명하는 부분, Thumbnail 은 작은 부분
    	.setThumbnail("https://blog.kakaocdn.net/dn/dFMq6V/btqDJgxK8qF/NadFlTKCzXmAiCCkQSluTk/img.png")
    	.addFields(
    	  {name: "번역어", value: "한국어(ko),영어(en),일본어(ja),중국어간체(zh-CN),중국어번체(zh-TW)",inline: true}, // 이름과 벨륨값을 정해주는 틀 
    	  {name: "오픈소스", value: "https://github.com/Nestor/discord-translator",inline: true},
    	  {name: "주소 링크", value: "https://discord.com/api/oauth2/authorize?client_id=1109755131639103508&permissions=8&scope=bot",inline: true}
    )
    
    message.channel.send({ embeds: [embed] });
  }
}
};