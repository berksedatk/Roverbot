module.exports = (client, message) => {

    if (!client.ready || message.author.bot) return;
    if (message.content.startsWith("sa ")) {
        message.reply("as");
    } else if (message.content.startsWith("selam")) {
        message.reply("selam")
    }
    if (message.content.includes("sik")) {
        message.reply("küfretme lan yavşak")
    }
}