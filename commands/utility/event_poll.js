const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('event-poll')
        .setDescription('Creates a poll for an event')
        .addStringOption(option => 
            option.setName('event')
            .setDescription('The name of the event')
            .setRequired(true)
        )
        .addIntegerOption(option => 
            option.setName('month')
            .setDescription('Choose the month (1-12)')
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(12)
        )
        .addIntegerOption(option => 
            option.setName('day')
            .setDescription('Choose the day (1-31)')
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(31)
        )
        .addIntegerOption(option =>
            option.setName('year')
            .setDescription('Enter the year (2025 or 2026)')
            .setRequired(true)
            .setMinValue(2025)
            .setMaxValue(2026)
        )
        .addIntegerOption(option => 
            option.setName('members')
            .setDescription('Type how many members NEED to go')
            .setRequired(true)
            .setMinValue(1)
        )
        .addIntegerOption(option =>
            option.setName('notif')
            .setDescription('How many days FROM the event to be notified by')
            .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('description')
            .setDescription('A brief description of the event')
            .setRequired(false)
        ),
    async execute(interaction) {
        await interaction.reply('Pong!');
    },
};

