
import { Client, GatewayIntentBits } from 'discord.js';
import { chat } from './src/chatGPT.mjs';
import { cfg,logger } from './src/config.mjs';

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
  logger.done('logged with ' + client.user.username)
  // models()
})

client.on('error', async (e) => {
  logger.error('[SVR] Error: \n' + e)
  // await getMainChannels(client).at(0).send('Deu ruim bicho  \n```' + e + '```')
})

client.on('messageCreate', async message => {
  if (!message.author.bot) {
    logger.info('trying completion from ' +message.author.username + ', message: ' + message.content)
    if (message.content.toLowerCase().startsWith('chat')) {
      let sliced = message.content.slice(5, message.content.length)
      let response = await chat(sliced, message.author.username)
      message.reply(response)
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