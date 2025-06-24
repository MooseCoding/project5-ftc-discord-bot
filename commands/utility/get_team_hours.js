const {SlashCommandBuilder} = require('discord.js');
const {get_total_hours} = require('../../database/handlers/fetch_outreach.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('get-team-hours')
        .setDescription('Get your team\'s outreach hours for the season'),
    async execute(interaction) {
        const team_id = interaction.guild.id;
        const hours = await get_total_hours(team_id);
        await interaction.reply(`Your team has ${hours} outreach hours`); 
    },
};

