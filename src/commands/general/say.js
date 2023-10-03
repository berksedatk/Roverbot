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
        const channel = client.channels.cache.get(interaction.channel.id);
        interaction.reply({content: "Message has been sent!", ephemeral: true }).then(message => {
            setTimeout(function(){
                message.delete();
              }, 2000)
        });
        channel.send(input);

    }
}