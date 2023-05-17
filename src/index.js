require("dotenv").config();

console.logDate = (str) => {
    let date = new Date().toLocaleDateString("tr-TR", { year:"numeric", month:"2-digit", day:"2-digit",hour: "numeric", minute: "numeric", second: "numeric" });
    console.log(`[${date}] - ${str}`);
}

//Mongoose
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.logDate("MongoDB bağlantısı başarılı"))
    .catch((err) => console.logDate("MongoDB bağlantısı başarısız\n" + err));

//Discord
const { Client, Intents, Collection } = require("discord.js");

const client = new Client({
    intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS]
});

client.events = new Collection();
client.commands = new Collection();
client.ready = false;

["event","command"].forEach(handler => {
    require(`./handlers/${handler}.js`)(client);
});

client.login(process.env.TOKEN);