const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gm')
        .setDescription('Replies with a link to the game manual'),
    async execute(interaction) {
        await interaction.reply(`No link yet since the season hasn't started`);
    },
};

