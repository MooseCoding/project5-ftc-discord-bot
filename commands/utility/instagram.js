const {SlashCommandBuilder} = require('discord.js');
const { get_instagram } = require('../../links/database/handlers/fetch_links');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('instagram')
        .setDescription('Replies with the team instagram!'),
    async execute(interaction) {
        const ti = interaction.guild.id;   
        const gh = await get_instagram(ti);

        if (gh == null) {
            await interaction.reply('Your instagram link is not setup');
        }
        else {
            await interaction.reply(`${gh}`);
        }
    },
};

