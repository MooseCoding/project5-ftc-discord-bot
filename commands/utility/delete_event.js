const {SlashCommandBuilder, PermissionsBitField} = require('discord.js');
const { deleteEvent } = require('../../outreach/database/handlers/insert_outreach');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete-event')
        .setDescription('Deletes an outreach event')
        .addStringOption(option => 
            option.setName('event')
            .setDescription('The event\'s name')
            .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('month')
            .setDescription('The month of the outreach event (1-12)')
            .setRequired(true)
            .setMaxValue(12)
            .setMinValue(1)
        )
        .addIntegerOption(option =>
            option.setName('day')
            .setDescription('The day of the outreach event (1-31)')
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(31)
        )
        .setDefaultMemberPermissions(PermissionsBitField.Flags.KickMembers | PermissionsBitField.Flags.BanMembers | PermissionsBitField.Flags.ManageRoles),
    async execute(interaction) {
        const team_id = interaction.guild.id;
        const event = interaction.options.getString('event');
        const month = interaction.options.getInteger('month');
        const day = interaction.options.getInteger('day');

        const deleted = await deleteEvent(team_id, event, month, day);

        if(deleted) {
            await interaction.reply('Deleted the outreach event!');
        }
        else {
            await interaction.reply('Did not delete the outreach event, error occured or event didn\'t exist'); 
        }
    },
};

