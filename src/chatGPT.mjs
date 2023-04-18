
import { cfg, logger } from "./config.mjs";
import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
  apiKey: cfg.openai_key,
});
const openai = new OpenAIApi(configuration);



export async function chat(message, user) {
  const botName = 'Bot'
  const userName = 'User'


  const config = {
    model: cfg.model ?? "text-davinci-003",
    prompt: cfg.getContext() + userName + ': ' + message + '\n ' + cfg.getRoleplay(user),
    max_tokens: parseInt(cfg.maxtokens),
    temperature: parseFloat(cfg.temperature),
    n: 1
  }
  cfg.addContext(userName + ': ' + message)
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
    cfg.addContext(botName + ': ' + text.replaceAll('\n', ' '))
    logger.done('response: ' + text.replaceAll('\n',' '))
    logger.info('token cost: ' + response.data.usage.total_tokens)
    return text
  } catch (error) {
    logger.error(error)
  }


}
