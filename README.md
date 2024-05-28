# **ChatRGB** #

ChatRGB is a Discord bot designed to be funny, but it now supports roleplays and maintains context. With a command system and chat history, ChatRGB provides an engaging and humorous experience for users.

## How to use

### Clone and install deps

```bash
git clone https://github.com/Kruceo/ChatRGB.git
cd ChatRGB
npm install
```

### Get your keys

Access [Google AI Studio](https://aistudio.google.com/app/apikey) and create or use a existent API key.

Access [Discord Dev](https://discord.com/developers/applications/) and create or use a existent Bot Token. 

### Configure

Create a `.env` file in the project root

```.env
DISC_TOKEN=ABCDEFGHIJKLMNOPQRSTUVW
GENAI_TOKEN=A1b2C3d4E5f6
```

### Running 

```bash
node index.mjs
```

## Docker Container

```
docker run -v /chatrgb/data \
-e DISC_TOKEN=YOURDISCORDTOKEN \
-e GENAI_TOKEN=YOURGENAITOKEN \
rafola/chatrgb
```