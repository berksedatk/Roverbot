const { SlashCommandBuilder: Builder } = require('@discordjs/builders');

module.exports = {
    data: new Builder()
    .setName('echo')
	.setDescription('Replies with your input!')
	.addStringOption(option =>
		option.setName('input')
			.setDescription('The input to echo back')
			.setRequired(true)),
    execute: (client, interaction) => {
        let input = interaction.options.getString('input');
        interaction.reply({
            content: input
        })
    }
}