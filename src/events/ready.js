const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9"); 

module.exports = async (client) => {
    console.logDate("Initiliazing client.");

    //Application Commands
    const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
    const devCommands = client.commands.filter(c => c.options?.dev).map(c => c.data.toJSON());
    const commands = client.commands.map(c => c.data.toJSON())
        .filter(c => !devCommands.some(d => d.name === c.name));
    
    try {
        console.logDate("Refreshing the application commands.");
        if (commands.length > 0) {
            await client.guilds.cache.forEach(async guild => {
                await rest.put(Routes.applicationGuildCommands(client.application.id, guild.id), {
                    body: commands
                }).catch((err) => {
                    console.logDate(`Error while setting up application commands for guild ${guild.name}(${guild.id}): ${err}`);
                });
            });
        }
        if (devCommands.length > 0 ) {
            devCommands.push(...commands);
            let guild = process.env.GUILD_ID != 0 ? await client.guilds.fetch(process.env.GUILD_ID) : false
            if (guild) {
                await rest.put(Routes.applicationGuildCommands(client.application.id, guild.id), {
                    body: devCommands
                }).catch((err) => {
                    console.logDate(`Error while setting up dev application commands for guild ${guild.name}(${guild.id}): ${err}`);
                });
            }
        }
    } catch(err) {
        console.error(err);
    }

    //Toplanti
    const Toplanti = require("../models/Toplanti");
    const toplantilar = await Toplanti.find()
    toplantilar.forEach(toplanti => {
        const date = new Date(toplanti.tarih * 1000);
        date.setHours(date.getHours() + 3);
        //setTimeout(() => {
        //    client.channels.cache.get(toplanti.kanal).send(`Toplantı başladı! <@&${toplanti.metin}>`);
        //    toplanti.delete().then(() => {console.logDate("Toplanti basariyla silindi.")}).catch(err => console.log(err));
        //}, date.getTime() - Date.now());
    });

    client.ready = true;
    console.logDate("Ready!");
}