////////////////////////////
//////CONFIG LOAD///////////
////////////////////////////
const { canModifyQueue } = require("../util/nkm");
const { Client, Collection, MessageEmbed } = require("discord.js");
const { attentionembed } = require("../util/attentionembed"); 
const { approveemoji,  denyemoji,  PREFIX,} = require(`../config.json`);
////////////////////////////
//////COMMAND BEGIN/////////
////////////////////////////
module.exports = {
  name: "loop",
  aliases: ['l'],
  description: "Toggle music loop",
  cooldown: 3,
  edesc: `Just type the Command in the chat to activate/deactivate loop, you can also react to the loop emoji, to receive the same goal!\nUsage: ${PREFIX}loop`,
execute(message) {
    //if not in a Guild return
    if(!message.guild) return;
    //Get the current Queue
    const queue = message.client.queue.get(message.guild.id);
    //If no Queue Error
    if (!queue) return attentionembed(message, "There is nothing playing <:StingyB:899626440524447794>").catch(console.error);
    //If not in a VOICE 
    if (!canModifyQueue(message.member)) return;
    //Reverse the Loop state
    queue.loop = !queue.loop;
    //Define the Loop embed
    const loopembed = new MessageEmbed()
    .setColor(queue.loop ? "#F0EAD6" : "#F0EAD6")
    .setAuthor(`Loop is now ${queue.loop ? "enabled" : "disabled"}`, "https://i.imgur.com/fN8WD7A.gif")
    //react with approve emoji
    message.react(approveemoji);
    //send message into the Queue chat
    return queue.textChannel
      .send(loopembed)
      .catch(console.error);
  }
};
