const { SlashCommandBuilder } = require("@discordjs/builders");
const { addSubscription } = require("../queries/subscriptions");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("subscribe")
    .setDescription("Subscribe to RSS Source")
    .addStringOption((option) =>
      option
        .setName("uri")
        .setDescription("The RSS source URL")
        .setRequired(true)
    ),
  async execute(interaction) {
    // Reply loading
    await interaction.reply("Adding to the subscriptions...");

    // Get User and Guild Id from interaction
    const {
      user: { id: userId },
      guildId,
      context: { graphqlClient: client },
      options: { data: options },
    } = interaction;

    const uri = options.filter((i) => i.name === "uri")[0].value;
    // Check if the URI is a valid uri
    if (
      !uri ||
      !uri.match(
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
      )
    )
      return interaction.editReply("⚠️ Please provide a valid URL");

    const variables = {
      objects: [
        {
          feed: uri,
          guildId,
          userId,
        },
      ],
    };

    try {
      const res = await client.request({
        document: addSubscription,
        variables,
      });

      interaction.editReply(`✅ Added 1 item to your subscriptions\n${uri}`);
    } catch (e) {
      // Send error message
      // TODO: Remove Error message
      return interaction.editReply("Oopsies! An error occured: " + e.message);
    }
  },
};
