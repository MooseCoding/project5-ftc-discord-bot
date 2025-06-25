const {SlashCommandBuilder} = require('discord.js');
const { get_website } = require('../../links/database/handlers/fetch_links');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('website')
        .setDescription('Replies with the team website!'),
    async execute(interaction) {
        const ti = interaction.guild.id;   
        const gh = await get_website(ti);

        if (gh == null) {
            await interaction.reply('Your website link is not setup');
        }
        else {
            await interaction.reply(`${gh}`);
        }
    },
};

