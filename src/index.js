const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Intents } = require("discord.js");
const graphqlClient = require("./lib/graphqlClient");
require("dotenv").config();

// Create Discord Client
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Create Command List
client.commands = new Collection();
const commandFiles = fs
  .readdirSync(path.resolve(__dirname, "commands"))
  .filter((file) => file.endsWith(".js"));

// Add commands from files to command list
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

// Notify when ready
client.once("ready", () => {
  console.log("Ready!");
});

// Handle message
client.on("interactionCreate", async (interaction) => {
  // Check if message is a command
  if (!interaction.isCommand()) return;

  // Set Interactions Context
  interaction.context = {
    graphqlClient,
  };

  // Get command
  const command = client.commands.get(interaction.commandName);

  // Check if command exists
  if (!command) return;

  // Handle command execution, else log error
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

// Login to Discord
client.login(process.env.DISCORD_TOKEN);
