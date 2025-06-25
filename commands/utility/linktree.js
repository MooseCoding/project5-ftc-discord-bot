const {SlashCommandBuilder} = require('discord.js');
const { get_linktree } = require('../../links/database/handlers/fetch_links');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('linktree')
        .setDescription('Replies with the team linktree!'),
    async execute(interaction) {
        const ti = interaction.guild.id;   
        const gh = await get_linktree(ti);

        if (gh == null) {
            await interaction.reply('Your linktree link is not setup');
        }
        else {
            await interaction.reply(`${gh}`);
        }
    },
};

