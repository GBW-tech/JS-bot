const Meme = require("memer-api")
const Discord = require("discord.js");

memer = new Meme();
exports.run = async (client, message) => {
if (message.content.startsWith(`=ipad`)) {
      const user = message.mentions.users.first() || message.author;
      var te = true;
      memer.ipad(user.avatarURL()).then(hitler=> {
         const attachment = new Discord.MessageAttachment(hitler, "ipad.png");
         message.channel.send(attachment)
      });
}
};