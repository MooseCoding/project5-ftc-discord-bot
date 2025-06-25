const {SlashCommandBuilder} = require('discord.js');
const { get_facebook } = require('../../links/database/handlers/fetch_links');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('facebook')
        .setDescription('Replies with the team facebook!'),
    async execute(interaction) {
        const ti = interaction.guild.id;   
        const gh = await get_facebook(ti);

        if (gh == null) {
            await interaction.reply('Your facebook link is not setup');
        }
        else {
            await interaction.reply(`${gh}`);
        }
    },
};

