const {SlashCommandBuilder} = require('discord.js');
const { get_github } = require('../../links/database/handlers/fetch_links');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('github')
        .setDescription('Replies with the team github!'),
    async execute(interaction) {
        const ti = interaction.guild.id;   
        const gh = await get_github(ti);

        if (gh == null) {
            await interaction.reply('Your github link is not setup');
        }
        else {
            await interaction.reply(`${gh}`);
        }
    },
};

