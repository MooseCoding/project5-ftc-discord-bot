const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const { insert_github, insert_website, insert_cad, insert_instagram, insert_linktree, insert_reddit, insert_facebook } = require('../../links/database/handlers/insert_links');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setup-links')
		.setDescription('Setups your teams links!')
        .addStringOption(option => 
            option.setName('github')
            .setDescription('Add your github repo so members can use /github')
            .setRequired(false)
        )
        .addStringOption(option => 
            option.setName('website')
            .setDescription('Add your website so members can use /website')
            .setRequired(false)
        )
        .addStringOption(option => 
            option.setName('cad')
            .setDescription('Add a link to your team\'s cadding platform for ease of use')
            .setRequired(false)
        )
        .addStringOption(option => 
            option.setName('instagram')
            .setDescription('Add your team\'s instagram so member can use /instagram')
            .setRequired(false)
        )
        .addStringOption(option => 
            option.setName('linktree')
            .setDescription('Add a linktree for more link support with /linktree')
            .setRequired(false)
        )
        .addStringOption(option => 
            option.setName('reddit')
            .setDescription('Add a reddit account or forum or whatever your members can use /reddit for')
            .setRequired(false)
        )
        .addStringOption(option => 
            option.setName('facebook')
            .setDescription('Add your team\'s facebook')
            .setRequired(false)
        )
        .setDefaultMemberPermissions(PermissionsBitField.Flags.KickMembers | PermissionsBitField.Flags.BanMembers | PermissionsBitField.Flags.ManageRoles),
	async execute(interaction) {
        const gh = interaction.options.getString('github');
        const si = interaction.options.getString('website');
        const ca = interaction.options.getString('cad');
        const ig = interaction.options.getString('instagram');
        const lt = interaction.options.getString('linktree');
        const rd = interaction.options.getString('reddit');
        const fb = interaction.options.getString('facebook');
        const ti = interaction.guild.id;

        try {
            if (gh) {
                await insert_github(ti, gh);
            }
            if (si) {
                await insert_website(ti, si);
            }
            if (ca) {
                await insert_cad(ti, ca);
            }
            if (ig) {
                await insert_instagram(ti, ig);
            }
            if (lt) {
                await insert_linktree(ti, lt);
            }
            if (rd) {
                await insert_reddit(ti, rd);
            }
            if(fb) {
                await insert_facebook(ti, fb);
            }

            await interaction.reply('Your links are set!!!')
        }
        catch(err) {
            console.error(err);
            await interaction.reply(
                'There was an error setting up the links'
            );
        }
	},
};