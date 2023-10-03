const { SlashCommandBuilder: Builder } = require('@discordjs/builders');

module.exports = {
    data: new Builder()
    .setName('say')
	.setDescription('Replies with your input without any trace!')
	.addStringOption(option =>
		option.setName('input')
			.setDescription('The input to echo back')
			.setRequired(true)),
    execute: (client, interaction) => {
        let input = interaction.options.getString('input');
        if (interaction.channel != null) {
            if (interaction.channel.type== "text") {
                const channel = client.channels.cache.get(interaction.channel.id);
                console.log(channel)
                interaction.reply({content: "Message has been sent!", ephemeral: true });
                channel.send(input);
            }
        }
    }
}