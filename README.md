# Discord_AI_chatbot
# 🤖 ChatGPT Discord Bot (Latest GPT)

A friendly Discord bot powered by **OpenAI’s latest GPT model** that can chat intelligently with users in real-time. Built using **Node.js**, **discord.js**, and **OpenAI API**.  

---

## Features

- Responds to messages in Discord channels using **the latest GPT model**.  
- Uses GPT-4 or GPT-4o-mini for cutting-edge AI conversations.  
- Ignores messages from bots (including itself).  
- Graceful error handling for API failures.  
- Easy to configure with a `.env` file for API keys.  
- Adjustable response temperature and max tokens for customization.  

---

## Demo

![demo-gif](link-to-your-demo-gif-or-screenshot) *(optional)*

---

## Prerequisites

- Node.js >= 18  
- Discord account & server  
- OpenAI API key  
- Discord Bot token  

---

## Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd <repo-folder>



Install dependencies

npm install


Create .env file

touch .env


Add your API keys:

DISCORD_TOKEN=your_discord_bot_token
OPENAI_KEY=your_openai_api_key


Run the bot

node index.js


✅ Bot should log: Logged in as <your-bot-name>

Usage

Send a message in your Discord server where the bot is added.

The bot will respond using the latest GPT model.

Works for text channels; DMs can be enabled optionally.

Folder Structure
├─ index.js          # Main bot code
├─ package.json      # Node.js dependencies
├─ .env              # API keys (ignored by git)
└─ .gitignore        # Ignores node_modules and .env
