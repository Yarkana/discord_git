const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder() // 슬래시 커맨드가 뭘 하는건지 정의해요 (deploy-commands.js와 연동)
    .setName("대구대 유용한 사이트 모음집")
    .setDescription("모음집을 보여줍니다."),

  async execute(interaction) {
    // 슬래시커맨드 행동을 정의해요 (index.js와 연동)
    const buttons = [
      // 각 버튼을 배열(array) 자료구조로 만들어요
      {
        customId: "대구대 학사공지",
        label: "학사공지로 바로 이동하기",
        style: "PRIMARY",
        async action(interaction) {
          await interaction.reply("https://www.daegu.ac.kr/article/DG159/list");
        },
      },
      {
        customId: "대구대 비교과시스템",
        label: "비교과시스템으로 바로 이동하기",
        style: "SECONDARY",
        async action(interaction) {
          await interaction.update({
            content: "https://heart.daegu.ac.kr/",
            components: [],
          });
        },
      },
      {
        customId: "대구대 lms",
        label: "lms로 바로 이동하기",
        style: "DANGER",
        async action(interaction) {
          // 여러분들이 버튼을 클릭했을때, 하고싶은 동작을 코드로 만들면 됩니다
          // 자바스크립트 기능을 여기다 추가하면 여러가지를 만들 수 있어요
          await interaction.reply("https://lms.daegu.ac.kr/ilos/main/main_form.acl");
        },
      },
    ];

    const row = new MessageActionRow().addComponents(
      // buttons array를 하나씩 읽어서 버튼을 만들게 됩니다
      buttons.map((button) => {
        return new MessageButton()
          .setCustomId(button.customId)
          .setLabel(button.label)
          .setStyle(button.style);
      })
    );

    // 버튼을 디스코드에 출력하는 코드
    await interaction.reply({ content: "버튼!", components: [row] });

    // filter : 버튼에 지정된 customId만 message collector가 동작할 수 있게 함
    const filter = (interaction) => {
      return buttons.filter(
        (button) => button.customId === interaction.customId
      );
    };

    // collector : discord.js component event를 수집하는 객체
    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 60 * 1000, // 몇초동안 반응할 수 있는지, ms단위라서 3초면 3000으로 입력
    });

    // collector.on (collect event) : collector 수집 및 수집한 콜렉터에 반응
    collector.on("collect", async (interaction) => {
      // 배열(buttons array)에 있는 동작을 자동으로 읽음
      const button = buttons.find(
        (button) => button.customId === interaction.customId
      );
      await button.action(interaction);
    });

    //버튼 이벤트 종료 (여기에서는 시간초과)가 됐을때, 뭘 할지 정의
    collector.on("end", async (collect) => {
      console.log("버튼 시간초과");
    });
  },
};