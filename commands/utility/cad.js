const {SlashCommandBuilder} = require('discord.js');
const { get_cad } = require('../../links/database/handlers/fetch_links');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cad')
        .setDescription('Replies with the team\'s choice of cad!'),
    async execute(interaction) {
        const ti = interaction.guild.id;   
        const gh = await get_cad(ti);

        if (gh == null) {
            await interaction.reply('Your cad link is not setup');
        }
        else {
            await interaction.reply(`${gh}`);
        }
    },
};

