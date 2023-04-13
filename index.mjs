
import { Client, GatewayIntentBits } from 'discord.js';
import { chat } from './src/chatGPT.mjs';
import { cfg, setRoleplay } from './src/config.mjs';
import { models } from './src/getModels.mjs';
import { getDevKeys, getMainChannels } from './src/utils.mjs';

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
  console.log('[SVR] logged with ' + client.user.username)
  // models()
})

client.on('error', async (e) => {
  console.log('[SVR] Error: \n' + e)
  //const msg = await getMainChannels(client).at(0).send('Deu ruim bicho  \n```' + e + '```')
})


client.on('messageCreate', async message => {
  if (!message.author.bot) {
    console.log("[USR] " + message.author.username + ' - ' +message.content)
    if (message.content.toLowerCase().startsWith('chat')) {

      let sliced = message.content.slice(5, message.content.length)
      let response = await chat(sliced,message.author.username)
      message.reply(response)
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


client.login(cfg.discord_key)
