const paginationEmbed = async (
  interaction,
  pages,
  emojiList = ["⏪", "⏩"],
  timeout = 120000
) => {
  // Check if interaction is accessible
  if (!interaction && !interaction.channel)
    throw new Error("Channel is inaccessible.");

  // Check if pages are given
  if (!pages) throw new Error("Pages are not given.");

  // Check if emojis are present
  if (emojiList.length !== 2) throw new Error("Need two emojis.");
  let page = 0;

  // Edit the reply
  const curPage = await interaction.editReply({
    embeds: [pages[page].setFooter(`Page ${page + 1} / ${pages.length}`)],
  });

  // Add navigation buttons
  for (const emoji of emojiList) await curPage.react(emoji);

  // Create a reaction collector
  const reactionCollector = interaction.channel.createReactionCollector(
    (reaction, user) => emojiList.includes(reaction.emoji.name) && !user.bot,
    { time: timeout }
  );
  // Add navigation EventListeners
  reactionCollector.on("collect", (reaction) => {
    reaction.users.remove(interaction.author);
    switch (reaction.emoji.name) {
      case emojiList[0]:
        page = page > 0 ? --page : pages.length - 1;
        break;
      case emojiList[1]:
        page = page + 1 < pages.length ? ++page : 0;
        break;
      default:
        break;
    }
    // Change page footer
    curPage.edit(pages[page].setFooter(`Page ${page + 1} / ${pages.length}`));
  });
  // If reaction collector times out
  reactionCollector.on("end", () => {
    if (!curPage.deleted) {
      curPage.reactions.removeAll();
    }
  });
  return curPage;
};

module.exports = paginationEmbed;
