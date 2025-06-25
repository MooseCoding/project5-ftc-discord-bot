const {get_user_hours} = require('../../outreach/database/handlers/fetch_outreach.js');
const {SlashCommandBuilder, PermissionsBitField, MessageFlags} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('get-member-hours')
        .setDescription('Get\'s a member\'s contribution to outreach (requires the ability to kick/ban)')
        .addUserOption(option => 
            option.setName('member')
            .setDescription('Choose the member you want to get hours for')
            .setRequired(true)
        ), 
        //.setDefaultMemberPermissions(PermissionsBitField.Flags.KickMembers | PermissionsBitField.Flags.BanMembers | PermissionsBitField.Flags.ManageRoles),
    async execute(interaction) {
        const team_id = interaction.guild.id;
        const member = interaction.options.getUser('member');
        const hours = await get_user_hours(member, team_id); 

        await interaction.reply(`${member.username} has ${hours} hours`)

        //await interaction.reply({content: `${member.username} has ${hours} hours`, flags: MessageFlags.Ephemeral})
    },
};
