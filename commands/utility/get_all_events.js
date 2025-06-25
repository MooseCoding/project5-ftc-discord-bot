const {SlashCommandBuilder} = require('discord.js');
const { get_all_events } = require('../../outreach/database/handlers/fetch_outreach');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('get-all-events')
        .setDescription('Replies with every outreach event that your team has done!'),
    async execute(interaction) {
        const team_id = interaction.guild.id;

        try {
            const events = await get_all_events(team_id);

            if(events.length === 0) {
                await interaction.reply('No outreach events logged for your team');
            }
            else {
                let grouped = {};
                for (const row of events) {
                    const key = `${row.event}_${row.date}`;
                    if(!grouped[key]) {
                        grouped[key] = {
                            event: row.event,
                            date: row.date,
                            desc: row.desc,
                            members: [],
                            totalHours:0
                        };
                    }

                    grouped[key].members.push({id: row.member_id, hours: row.hours});
                    grouped[key].totalHours += row.hours;

                    if(!grouped[key].desc && row.description) {
                        grouped[key].description = row.description;
                    }
                }
            
                let output = `Outreach Events\n\n`;

                for(const event of Object.values(grouped)) {
                    const timestamp = parseInt(event.date);
                    const formattedDate = new Date(timestamp).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                    });

                    output += `Event: ${event.event} \n`;
                    output += `Date: ${formattedDate} | Total Hours: ${event.totalHours} | Desc: ${event?.desc ?? 'No description'}\n`;
                    output += `Members: `;

                    for (const m of event.members) {
                        const user = await interaction.client.users.fetch(m.id);
                        output += `${user.username}, `
                    }
                    output+=`\n`; 
                }

                output+=`\n`;

                if(output.length > 2000) {
                    output = output.slice(0, 1990) + '\n... (truncated)';
                }

                await interaction.reply(output);
            }
        }
        catch(err) {
            console.error(err);
            await interaction.reply('Failed to get all events for some reason');
        }
    },
};

