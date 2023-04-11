
import { bold, Client, EmbedBuilder, Emoji, GatewayIntentBits } from 'discord.js';
import { chat } from './src/chatGPT.mjs';
import { setRoleplay } from './src/config.mjs';
import { models } from './src/getModels.mjs';
import { getMainChannels } from './src/utils.mjs';

export const client = new Client(
  {
    intents:
      [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages
      ]
  });

client.on('ready', async () => {
  console.log('[Server] logged with ' + client.user.username)
  // models()
})

client.on('error', async (e) => {
  const msg = await getMainChannels(client).at(0).send('Deu ruim bicho  ' + e)
})


client.on('messageCreate', async message => {
  if (!message.author.bot) {
    console.log(message.content)
    if (message.content.toLowerCase().startsWith('chat')) {

      let sliced = message.content.slice(5, message.content.length)
      console.log(sliced)
      let response = await chat(sliced)
      //JSON.stringify(response)
      console.log(response)
      message.reply(response)
      // message.channel.send(response)
    }
  }
  if (message.content.toLowerCase().startsWith('setsufix')) {

    let sliced = message.content.slice(9, message.content.length)
    console.log(sliced)
    setRoleplay(sliced)
    //JSON.stringify(response)
    message.reply('sufixo alterado!')
    // message.channel.send(response)
  }
})


client.login(process.env.TOKEN)
