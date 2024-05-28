
import { Client, GatewayIntentBits } from 'discord.js';
import { messageHandler } from './src/messageHandler.mjs';
import { roleplayCommandHandler } from './src/commands.mjs';
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
  console.log("ready",client.user.username)
})

client.on('error', async (e) => {
  console.error(e.name  + '\n' + e.message + '\n' + e.stack)
  // await getMainChannels(client).at(0).send('Deu ruim bicho  \n```' + e + '```')
})

client.on('messageCreate',messageHandler)
client.on('messageCreate',roleplayCommandHandler)


login()

function login() {
  console.log('trying to login...')
  client.login(process.env.DISC_TOKEN).catch((err) => {
    console.error(err)
    process.exit(1)
  })
}