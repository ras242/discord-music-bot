const fs = require("fs")
const ytdl = require("ytdl-core")

async function play(connection, url) {
  connection.play(await ytdl(url), { type: 'opus' });
}

module.exports = {
  name: "superidol",
  description: "super idol decharon",
  aliases: ["105C"],
  cooldown: 5,
  edesc: `24/7 105C`,

async execute(message,args,client) {

    const urls = [
        "https://www.youtube.com/watch?v=Ahrvn7IVgHk", //china's got talent
        "https://www.youtube.com/watch?v=nXKBzuw3Ct0", //spongebob
        "https://www.youtube.com/watch?v=04Nna741O54" //female 105C
    ]

    const guild = client.guilds.cache.get("562897909247508500")
    const vc = await client.channels.fetch("620123488719470594")

    const connection = await vc.join()
    
    play(connection)

    async function play(connection) {
        
        const random = urls[Math.floor(Math.random() * urls.length)]

        const stream = ytdl(random, { filter: "audioonly" })
    
        const dispatcher = connection.play(stream)
        dispatcher.on("finish", () => {
            play(connection)
        })
    }
}}