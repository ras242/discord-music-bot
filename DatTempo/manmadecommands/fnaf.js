const fs = require("fs")
const ytdl = require("ytdl-core")

async function play(connection, url) {
  connection.play(await ytdl(url), { type: 'opus' });
}

module.exports = {
  name: "fnaf",
  description: "plays a random fnaf song",
  aliases: ["purpleguy", "fnaf lofi"],
  cooldown: 0,
  edesc: `24/7 fnaf`,

async execute(message,args,client) {

    const urls = [
        "https://www.youtube.com/watch?v=l18A5BOTlzE", //fnaf 1
        "https://www.youtube.com/watch?v=S6FRfxU-4Q4", //fnaf 2 lofi
        "https://www.youtube.com/watch?v=yD7UtPfSryU", //fnaf 1 jazz
        "https://www.youtube.com/watch?v=rLeQSd7R-jU", //join us for a bite
        "https://www.youtube.com/watch?v=gk-aCL6eyGc", //fnaf 2
        "https://www.youtube.com/watch?v=fxEW-NT8Z2I", //fnaf 2 jazz
        "https://www.youtube.com/watch?v=fUSJxnRzTQY", //stay calm
        "https://www.youtube.com/watch?v=YREhVveHq9k", //got no time
	"https://www.youtube.com/watch?v=X6ELpluyZyg" //This comes from inside
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