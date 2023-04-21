
import { cfg, logger } from "./config.mjs";
import { Configuration, OpenAIApi } from "openai"
import fs from 'fs'
import { Message } from "discord.js";
const configuration = new Configuration({
  apiKey: cfg.openai_key,
});
const openai = new OpenAIApi(configuration);
/**
 * 
 * @param {string} message 
 * @param {Message} raw 
 * @returns 
 */
export async function chat(message,raw) {

  const clientID = "G"+raw.guild.id+'C'+ raw.channel.id
  const botName = 'Bot'
  const userName = 'User'

  const context = cfg.enable_context == 'true'?cfg.context_manager.getContext(clientID):''

  const config = {
    model: cfg.model ?? "text-davinci-001",
    prompt: context + userName + ': ' + message + '\n' + cfg.roleplay_manager.getRoleplay(clientID).replaceAll('#USER#',raw.author.username),
    max_tokens: parseInt(cfg.maxtokens),
    temperature: parseFloat(cfg.temperature),
    n: 1
  }
  
  cfg.context_manager.appendContext(clientID,userName + ': ' + message)
  logger.info(JSON.stringify(config, ' ', 2))
  try {
    const response = await openai.createCompletion(config);
    let text = response.data.choices[0].text
    if (text.includes(botName + ': ')) {
      text = text.replaceAll(botName + ": ", '')
    }
    if (':.?,!#'.indexOf(text.toLowerCase()[0]) !== -1) {
      text = text.slice(1);
    }
    text = text.trim()

    cfg.context_manager.appendContext(clientID,botName + ': ' + text.replaceAll('\n', ' '))
    logger.done('response: ' + text.replaceAll('\n',' '))
    logger.info('token cost: ' + response.data.usage.total_tokens)
    return text
  } catch (error) {
    logger.error(error)
  }
}
