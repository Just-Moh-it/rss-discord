const { SlashCommandBuilder } = require("@discordjs/builders");
const getUserSubscriptions = require("../lib/getUserSubscriptions");

// Use either MessageEmbed or RichEmbed to make pages
// Keep in mind that Embeds should't have their footers set since the pagination method sets page info there
const { MessageEmbed, Message } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("feed")
    .setDescription("Get RSS Feed"),
  async execute(interaction) {
    // Reply loading
    await interaction.reply("Here comes your Feed");

    // Get User and Guild Id from interaction
    const {
      user: { id: userId },
      guildId,
      context: { graphqlClient: client },
    } = interaction;

    try {
      getUserSubscriptions({ userId, guildId, client });
    } catch (e) {
      // Send error message
      // TODO: Remove Error message
      return interaction.editReply("Oopsies! An error occured: " + e.message);
    }
  },
};
