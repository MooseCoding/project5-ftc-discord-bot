const {get_user_hours} = require('../../database/handlers/fetch_outreach.js');
const {SlashCommandBuilder, PermissionsBitField} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('get-your-hours')
        .setDescription('Get\'s your contribution to outreach (requires the ability to kick/ban)')
        .addUserOption(option => 
            option.setName('member')
            .setDescription('Choose the member you want to get hours for')
            .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionsBitField.Flags.KickMembers | PermissionsBitField.Flags.BanMembers | PermissionsBitField.Flags.ManageRoles),
    async execute(interaction) {
        const team_id = interaction.guild.id;
        const member = interaction.options.getUser('member')
        const hours = await get_user_hours(member, team_id); 

        await interaction.reply({content:`${member.username} has ${hours} hours`, flags: MessageFlags.Ephemeral})
    },
};
