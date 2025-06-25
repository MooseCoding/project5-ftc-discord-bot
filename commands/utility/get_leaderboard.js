const {SlashCommandBuilder} = require('discord.js');
const { get_leaderboard } = require('../../outreach/database/handlers/fetch_outreach');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('get-leaderboard')
        .setDescription('Shows a leaderboard of the top 15 outreach participants!'),
    async execute(interaction) {
        const team_id = interaction.guild.id;
        const leaderboard = await get_leaderboard(team_id); 

        if(!leaderboard.length) {
            await interaction.reply('No outreach hours in the database');
        }
        else {
            let reply = 'Outreach Leaderboard\n\n';
            for (let i = 0; i < leaderboard.length; i++) {
                const user = leaderboard[i].member_id;
                let u;
                try {
                    u = await interaction.client.users.fetch(user);
                }
                catch {
                    u = {username: 'Unknown'};
                }

                reply += `${i+1}. ${u.username} - ${leaderboard[i].total_hours}\n`;
            }

            await interaction.reply(reply); 
        }
    },
};

