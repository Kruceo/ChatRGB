
import { cfg } from "./config.mjs";
import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
  apiKey: cfg.openai_key,
});
const openai = new OpenAIApi(configuration);



export async function chat(message, user) {
  const botName = 'Bot'
  const userName = 'User'

  cfg.addContext(userName + ': ' + message)
  const config = {
    model: cfg.model ?? "text-davinci-003",
    prompt: cfg.getContext() + ', ' + cfg.getRoleplay(user),
    max_tokens: parseInt(cfg.getMaxTokens()),
    temperature: cfg.getTemperature(),
    n: 1
  }

  console.log('[SVR] ' + JSON.stringify(config.prompt))
  const response = await openai.createCompletion(config);
  let text = response.data.choices[0].text
  console.log(text.toLowerCase().trim())
  if (text.includes(botName + ': ')) {
    text = text.replaceAll(botName + ": ", '')
  }
  if (':.?,'.indexOf(text.toLowerCase()[0]) !== -1) {
    text = text.slice(1);
  }
  cfg.addContext(botName + ': ' + text.replaceAll('\n', ' '))
  console.log('[SVR] response: ' + text)
  console.log('[SVR] token cost: ' + response.data.usage.total_tokens)
  return text
}
