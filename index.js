const express = require("express");
const app = express();
const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    const msg = bot.snipes.get(message.channel.id)
    const embed = new Discord.MessageEmbed()
    .setAuthor(msg.author, msg.member.user.displayAvatarURL())
    .setDescription(msg.content)
    .setFooter('Get Sniped lol')
    .setTimestamp();
    message.channel.send(embed);
}
 
app.listen(() => console.log("💕💕💕💕"));
 
app.use('/ping', (req, res) => {
  res.send(new Date());
});
var str_replace = require('str_replace');
const fs = require('fs');
const discord = require('discord.js');
var discordIndexHTML = fs.readFileSync(__dirname + "/index.html", { encoding: "utf8" });
app.use("*", async (req, res) => {
	res.send(discordIndexHTML);
});
const client = new discord.Client({ disableMentions:'everyone' });

const { Player } = require('discord-player');

const player = new Player(client);
client.player = player;
client.config = require('./config/bot.json');
client.emotes = require('./config/emojis.json');
client.filters = require('./config/filters.json');
client.commands = new discord.Collection();

setInterval(() => {
  const channel = client.channels.cache.get(client.config.channel);
  if (!channel) return //console.error("I can't find this channel!");
  channel
    .join()
    .then(con => {
      console.log("Working!");
    })
    .catch(e => {
      console.error(e);
    });
}, 3000);

fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Loading event ${eventName} 🌚`);
        client.on(eventName, event.bind(null, client));
    });
});

fs.readdir('./player-events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./player-events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Loading player event ${eventName} 🌚`);
        client.player.on(eventName, event.bind(null, client));
    });
});

fs.readdir('./commands/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Loading command ${commandName} 🌚`);
        client.commands.set(commandName, props);
    });
});

client.on('guildMemberAdd', member => {
  member.send("Welcome to Server:" + member.guild.name + " Have a great day !!");
});
client.login(client.config.token_bot);

client.on("message", async (message) => {
  if (message.author.bot) return;
  let msg = message.content;

  let emojis = msg.match(/(?<=:)([^:\s]+)(?=:)/g)
  if (!emojis) return;
  emojis.forEach(m => {
    let emoji = client.emojis.cache.find(x => x.name === m)
    if (!emoji) return;
    let temp = emoji.toString()
    if (new RegExp(temp, "g").test(msg)) msg = msg.replace(new RegExp(temp, "g"), emoji.toString())
    else msg = msg.replace(new RegExp(":" + m + ":", "g"), emoji.toString());
  })

  if (msg === message.content) return;

  let webhook = await message.channel.fetchWebhooks();
  let number = randomNumber(1, 2);
  webhook = webhook.find(x => x.name === "NQN" + number);

  if (!webhook) {
    webhook = await message.channel.createWebhook(`NQN` + number, {
      avatar: client.user.displayAvatarURL({ dynamic: true })
    });
  }

  await webhook.edit({
    name: message.member.nickname ? message.member.nickname : message.author.username,
    avatar: message.author.displayAvatarURL({ dynamic: true })
  })

  message.delete().catch(err => { })
  webhook.send(msg).catch(err => { })

  await webhook.edit({
    name: `NQN` + number,
    avatar: client.user.displayAvatarURL({ dynamic: true })
  })


})


//--------------------------------------------------- F U N C T I O N S --------------------------------------

function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
} 