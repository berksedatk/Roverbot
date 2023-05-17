module.exports = (client, interaction) => {
    if (!client.ready || !interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (command) {
        command.execute(client, interaction);
    } 
}