const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unsubscribe')
		.setDescription('Unsubscribe to RSS Source'),
	async execute(interaction) {
		return interaction.reply('Removed Subscription from list!');
	},
};
