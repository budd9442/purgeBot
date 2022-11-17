import { Client, GatewayIntentBits, Message } from "discord.js";
import { config } from "dotenv";

config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
const token = process.env.token;

client.on("ready", () => {
  console.log(`${client.user.tag} logged in`);
});

client.on("messageCreate", (message) => {
  if (message.content.startsWith("!purgev2")) {
    client.channels.fetch("804913641132392448").then((ch) => {
      ch.send(
        `${message.member.user.tag} issued command : \`${message.content}\` in #${message.channel.name} `
      );
    });
    if (message.member.roles.cache.has("951472058594914304")) {
      let n = parseInt(message.content.split(" ")[1]);
      if (n > 0) {
        message.channel
          .send(`Deleting last ${n} messages`)
          .then((msg) => {
            setTimeout(() => msg.delete(), 3000);
          })
          .catch(console.error);
        message.channel.messages
          .fetch({ limit: n + 1 })
          .then((messages) => {
            messages.forEach((i) => {
              setTimeout(function () {
                message.channel.messages.delete(i.id);
              }, 200);
            });
          })
          .catch(console.error);
      } else {
        message.react("🤡");
      }
    } else {
      message.reply("shush noob");
    }
  }
});

client.login(token);
