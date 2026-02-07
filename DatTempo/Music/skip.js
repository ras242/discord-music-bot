////////////////////////////
//////CONFIG LOAD///////////
////////////////////////////
const { canModifyQueue } = require("../util/nkm");
const { Client, Collection, MessageEmbed } = require("discord.js");
const { attentionembed } = require("../util/attentionembed");
const { approveemoji, denyemoji, PREFIX, } = require(`../config.json`);
////////////////////////////
//////COMMAND BEGIN/////////
////////////////////////////
module.exports = {
  name: "skip",
  aliases: ["se"],
  description: "Skip the currently playing song",
  cooldown: 0,
  edesc: `Type the Command, to skip to current listening song.\nUsage: ${PREFIX}skip`,

execute(message) {
    //if not in a guild retunr
    if (!message.guild) return;
    //react with approve emoji
    message.react(approveemoji).catch(console.error);
    //get the queue
    const queue = message.client.queue.get(message.guild.id);
    //if no Queue return error
    if (!queue)
      return attentionembed(message, "There is nothing you can skip!").catch(console.error);
    //if not in the same channel return
    if (!canModifyQueue(message.member)) return;
    //set playing to true 
    queue.playing = true;
    //end current song
    queue.connection.dispatcher.end();
    //send approve message
    queue.textChannel.send(
      new MessageEmbed().setColor("#F0EAD6").setDescription(`${message.author.username} skipped the song <:Monkey:881888675082948688>.`, "https://i.imgur.com/fN8WD7A.gif")
    ).catch(console.error);
  }
};
