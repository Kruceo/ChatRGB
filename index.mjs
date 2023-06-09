
import { Client, GatewayIntentBits } from 'discord.js';
import { chat } from './src/bot/chatGPT.mjs';
import { cfg,logger } from './src/config.mjs';
import initCommands from './src/commands.mjs';
import AvatarManager from './src/managers/AvatarManager.mjs';

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
  initCommands(client)
 
  logger.done('logged with ' + client.user.username)
  // models()
})

client.on('error', async (e) => {
  logger.error(e.name  + '\n' + e.message + '\n' + e.stack)
  // await getMainChannels(client).at(0).send('Deu ruim bicho  \n```' + e + '```')
})

client.on('messageCreate', async message => {
  if (!message.author.bot) {
    if (message.content.toLowerCase().startsWith(cfg.bot_name.trim() +' ')) {
      logger.info('trying completion from ' +message.author.username + ', message: ' + message.content)
      let sliced = message.content.slice(cfg.bot_name.trim().length + 1, message.content.length)
      message.channel.sendTyping()
      let response = await chat(sliced, message)
      message.channel.send({content:response})
    }
  }
})


login()

function login() {
  logger.info('trying to login...')
  client.login(cfg.discord_key).catch((err) => {
    logger.error(err)
    logger.info('Trying again in 10 seconds')
    setTimeout(()=>{
      login()
    },10000)
  })
}