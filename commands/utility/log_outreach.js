const {SlashCommandBuilder} = require('discord.js');
const {insertOutreach} = require('../../outreach/database/handlers/insert_outreach.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('log-outreach-hours')
        .setDescription('Logs outreach hours')
        .addStringOption(option => 
            option.setName('event')
            .setDescription('The event\'s name')
            .setRequired(true)
        )
        .addIntegerOption(option => 
            option.setName('month')
            .setDescription('Choose the month, 1 = Jan, 12 = Dec')
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(12)
        )
        .addIntegerOption(option => 
            option.setName('day')
            .setDescription('Choose the day 1-31')
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(31)
        )
        .addIntegerOption(option => 
            option.setName('hours-per-member')
            .setDescription('How many hours per member')
            .setRequired(true)
        )
        .addUserOption(option => 
            option.setName('member1')
            .setDescription('The first member you want to log')
            .setRequired(true)
        )
        .addUserOption(option => 
            option.setName('member2')
            .setDescription('The second member you want to log')
            .setRequired(false)
        )
        .addUserOption(option => 
            option.setName('member3')
            .setDescription('The third member you want to log')
            .setRequired(false)
        )
        .addUserOption(option => 
            option.setName('member4')
            .setDescription('The fourth member you want to log')
            .setRequired(false)
        )
        .addUserOption(option => 
            option.setName('member5')
            .setDescription('The fifth member you want to log')
            .setRequired(false)
        )
        .addUserOption(option => 
            option.setName('member6')
            .setDescription('The sixth member you want to log')
            .setRequired(false)
        )
        .addUserOption(option => 
            option.setName('member7')
            .setDescription('The seventh member you want to log')
            .setRequired(false)
        )
        .addUserOption(option => 
            option.setName('member8')
            .setDescription('The eighth member you want to log')
            .setRequired(false)
        )
        .addStringOption(option => 
            option.setName('description')
            .setDescription('Brief description of the event')
            .setRequired(false)
        )
        .addAttachmentOption(option => 
            option.setName('image1')
            .setDescription('The first from the event')
            .setRequired(false)
        )
        .addAttachmentOption(option =>
            option.setName('image2')
            .setDescription('The second image from the event')
            .setRequired(false)
        ),
    async execute(interaction) {
        const members = [];
        const teamId = interaction.guild.id; 

        for (let i = 1; i <= 8; i++) {
            const user = interaction.options.getUser(`member${i}`);
            if (user) members.push(user.id);
        }

        const event = interaction.options.getString('event');
        const month = interaction.options.getInteger('month');
        const day = interaction.options.getInteger('day'); 
        const hours = interaction.options.getInteger('hours-per-member');
        const desc = interaction.options.getString('description');
        const image1 = interaction.options.getAttachment('image1')?.url ?? null;
        const image2 = interaction.options.getAttachment('image2')?.url ?? null;

        for (const member of members) {
            await insertOutreach(event, month, day, hours, member, teamId, desc, image1, image2);
        }

        await interaction.reply(`Logged hours for ${interaction.options.getString('event')}!`)
    },
};

