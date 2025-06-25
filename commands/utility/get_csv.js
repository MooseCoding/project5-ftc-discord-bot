const { SlashCommandBuilder } = require('discord.js');
const path = require('path');
const fs = require('fs');
const {get_all_events} = require('../../outreach/database/handlers/fetch_outreach');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('get-csv')
        .setDescription('Replies with a .csv file containing all outreach data for your team'),
        
    async execute(interaction) {
        const team_id = interaction.guild.id; 

        try {
            const events = await get_all_events(team_id);

            if (!events || events.length === 0) {
                return await interaction.reply('No outreach events logged — no .csv generated.');
            }

            const dir = path.join(__dirname, '../../../temp');
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            const fp = path.join(dir, `outreach_${team_id}.csv`);
            let csv = 'Event,Date,Member ID,Hours,Description\n';

            fs.writeFileSync(fp, csv);

            for (const row of events) {
                let username = 'Unknown';
                try {
                    const user = await interaction.client.users.fetch(row.member_id);
                    username = user.username.replace(/,/g, '');
                }
                catch {}
                const formattedDate = new Date(parseInt(row.date)).toLocaleDateString('en-US');
                const cleanDesc = (row.description ?? '').replace(/"/g, '""');
                csv += `"${row.event}","${formattedDate}","${username}","${row.hours}","${cleanDesc}"\n`;
            }

            fs.writeFileSync(fp, csv);

            await interaction.reply({
                content: 'Here is your outreach log as a CSV file:',
                files: [fp]
            });

            setTimeout(() => {
                fs.unlink(fp, err => {
                    if (err) console.error(`Failed to delete temp file at ${fp}`, err);
                });
            }, 30_000);
        } catch (err) { 
            console.error(err);
            await interaction.reply('Failed to generate CSV due to an internal error.');
        }
    },
};