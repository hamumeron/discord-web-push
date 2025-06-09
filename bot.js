const { Client, GatewayIntentBits, Partials } = require("discord.js");
const axios = require("axios");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.channel.type === 1 || message.channel.name === "通知") {
    console.log("送信:", message.content);
    try {
      await axios.post("https://YOUR-GLITCH-NAME.glitch.me/notify", {
        title: "📨 Discord通知",
        body: `${message.author.username}：${message.content}`,
      });
    } catch (e) {
      console.error("通知送信エラー:", e.message);
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
