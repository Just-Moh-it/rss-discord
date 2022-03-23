const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { subscriptions } = require("../queries/subscriptions");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("subscriptions")
    .setDescription("List all your subscriptions"),
  async execute(interaction) {
    // Reply loading
    await interaction.reply("Listing all subscriptions...");

    // Get User and Guild Id from interaction
    const {
      user: { id: userId, username },
      guildId,
      context: { graphqlClient: client },
    } = interaction;

    const variables = {
      where: {
        _and: [
          {
            guildId: {
              _eq: guildId,
            },
            userId: {
              _eq: userId,
            },
          },
        ],
      },
    };

    try {
      const res = await client.request({
        document: subscriptions,
        variables,
      });

      // Create new embed with all subscriptions
      const embed = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Your Subscriptions")
        .setDescription(`List of all ${username}'s subscriptions`)
        .setThumbnail("https://i.imgur.com/qWScPn5.png")
        .addFields(
          ...res.subscriptions_aggregate.nodes.map(({ feed }, idx) => ({
            name: `${idx + 1}. ${feed.split("/").slice(0, 3).slice(-1)}`,
            value: feed,
          }))
        );

      // Send embed to user
      await interaction.editReply({ embeds: [embed] });
    } catch (e) {
      // Send error message
      // TODO: Remove Error message
      return interaction.editReply("Oopsies! An error occured: " + e.message);
    }
  },
};
