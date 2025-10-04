// index.js - safer version
require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const OpenAI = require('openai');

// Validate environment
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const OPENAI_KEY = process.env.OPENAI_KEY;
if (!DISCORD_TOKEN || !OPENAI_KEY) {
  console.error('Missing environment variables. Please set DISCORD_TOKEN and OPENAI_KEY in your .env file.');
  process.exit(1);
}

// Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// OpenAI client
const openai = new OpenAI({ apiKey: OPENAI_KEY });

// When the bot is ready
client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// Basic error handlers
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

// Message handler
client.on('messageCreate', async (message) => {
  try {
    // Ignore bots (including itself)
    if (message.author?.bot) return;

    // Optionally ignore DMs:
    // if (!message.guild) return;

    const userText = message.content?.trim();
    if (!userText) return; // nothing to send to OpenAI

    // Call OpenAI - adjust depending on your openai package version (see note below)
    const gptResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a friendly chatbot." },
        { role: "user", content: userText }
      ],
      temperature: 0.9,
      max_tokens: 150,
    });

    const reply = gptResponse?.choices?.[0]?.message?.content;
    if (reply) {
      await message.reply(reply);
    } else {
      console.warn('OpenAI returned unexpected shape:', gptResponse);
      await message.reply("Sorry, I couldn't generate a reply right now.");
    }
  } catch (err) {
    console.error('Error handling message:', err);
    // Avoid spamming the channel for every error; simple acknowledgement is fine
    try {
      await message.reply("Sorry, I'm having trouble reaching the AI service right now.");
    } catch (replyErr) {
      // ignore
    }
  }
});

// Login
client.login(DISCORD_TOKEN)
  .catch(err => {
    console.error('Failed to login to Discord:', err);
    process.exit(1);
  });