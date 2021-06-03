
module.exports = {
    name: "restart",
    category: "owner",
    run: async (client, message, args) => {
        if (message.author.id !== '836091425145094195') {
            return message.channel.send(`Uh, I am sorry but only the bot owner can restart the bot for more information DM to him Microsoft#6828`)
        }
        await message.channel.send(`Shutting down the bot...`)
        process.exit();
        

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

    }
}