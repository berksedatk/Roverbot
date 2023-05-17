const { SlashCommandBuilder: Builder } = require('@discordjs/builders');

module.exports = {
    data: new Builder()
        .setName("test")
        .setDescription("Test command."),
    execute: (client, interaction) => {
        interaction.reply("Testing!");
    }
}