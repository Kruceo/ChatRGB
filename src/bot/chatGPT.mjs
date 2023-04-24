
import { cfg, logger } from "../config.mjs";
import { Configuration, OpenAIApi } from "openai"
import { Message } from "discord.js";
import { genChannelID } from "../utils.mjs";


/**
 * sends a completion request and return the response
 * @param {string} message 
 * @param {Message} raw 
 * @returns 
 */
export async function chat(message, raw) {
  //openAI auth
  const apiKey = cfg.key_manager.get(raw.guildId).key
  if (!apiKey) return "Your server don't have a api key, take a see in OpenAI API website to get one!\n ```https://platform.openai.com/account/api-keys```"
  const configuration = new Configuration({
    apiKey
  });
  const openai = new OpenAIApi(configuration);

  //this api auth
  const clientID = genChannelID(raw)
  const botName = 'Bot'
  const userName = 'User'

  const context = cfg.enable_context == 'true' ? cfg.context_manager.getContext(clientID) : ''

  const config = {
    model: cfg.model ?? "text-davinci-002",
    prompt: context + userName + ': ' + message + '\n' + cfg.roleplay_manager.getRoleplay(clientID).replaceAll('#USER#', raw.author.username),
    max_tokens: parseInt(cfg.maxtokens),
    temperature: parseFloat(cfg.temperature),
    n: 1
  }

  cfg.context_manager.appendContext(clientID, userName + ': ' + message)
  logger.info(JSON.stringify(config, ' ', 2))
  try {
    const response = await openai.createCompletion(config);
    let text = response.data.choices[0].text.trim()
    logger.done('raw response: ' + text.replaceAll('\n', ' '))

    if (text.includes(botName + ': ')) {
      text = text.replaceAll(botName + ": ", '')
    }
    if (':.?,!#"\''.indexOf(text.toLowerCase()[0]) !== -1) {
      text = text.slice(1,text.length);
    }
    if (':"\''.indexOf(text.toLowerCase()[text.length-1]) !== -1) {
      text = text.slice(0,text.length-2);
    }
    text = text.trim()

    cfg.context_manager.appendContext(clientID, botName + ': ' + text.replaceAll('\n', ' '))
    logger.done('parsed response: ' + text.replaceAll('\n', ' '))
    logger.info('token cost: ' + response.data.usage.total_tokens)
    return text
  } catch (error) {
    logger.error(error)
  }
}
