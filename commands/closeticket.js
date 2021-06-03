exports.run = async (client, message) => {
if(message.content === '=closeticket'){
    console.log("Someone is is ticket close");
    var Msgman = message.author.username;
    const fetchedChannel = message.guild.channels.cache.find(r => r.name === `ticket-${Msgman.toLowerCase()}`);
    message.channel.send("Ticket's game is finish now :ok_hand: " + `ticket-${Msgman.toLowerCase()}`);
    fetchedChannel.delete();
}
}