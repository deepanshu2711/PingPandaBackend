import { Client, GatewayIntentBits } from "discord.js";

export const startDiscordBot = () => {
  const client = new Client({
    intents: [GatewayIntentBits.Guilds],
  });
  client.login(process.env.DISCORD_BOT_TOKEN);

  client.once("ready", () => {
    if (client.user) {
      console.log(`Logged in as ${client.user.tag}!`);
    }
  });

  return client;
};
