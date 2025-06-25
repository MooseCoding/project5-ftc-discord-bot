const {SlashCommandBuilder} = require('discord.js');
const { get_reddit } = require('../../links/database/handlers/fetch_links');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reddit')
        .setDescription('Replies with the team reddit!'),
    async execute(interaction) {
        const ti = interaction.guild.id;   
        const gh = await get_reddit(ti);

        if (gh == null) {
            await interaction.reply('Your reddit link is not setup');
        }
        else {
            await interaction.reply(`${gh}`);
        }
    },
};

