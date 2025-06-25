const {get_user_hours} = require('../../outreach/database/handlers/fetch_outreach.js');
const {SlashCommandBuilder, PermissionsBitField} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('get-your-hours')
        .setDescription('Get\'s your contribution to outreach'),
    async execute(interaction) {
        const team_id = interaction.guild.id;
        const member = interaction.user.id; 
        const hours = await get_user_hours(member, team_id); 

        await interaction.reply({content:`${member.username} has ${hours} hours`, flags: MessageFlags.Ephemeral})
    },
};
