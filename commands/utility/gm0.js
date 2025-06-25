const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gm0')
        .setDescription('Replies with a link to gm0'),
    async execute(interaction) {
        await interaction.reply(`GM0 is at https://gm0.org/en/latest/`);
    },
};

