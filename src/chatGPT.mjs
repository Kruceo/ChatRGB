
import { cfg } from "./config.mjs";
import { Configuration, OpenAIApi } from "openai"


const configuration = new Configuration({
  apiKey: cfg.openai_key,
});
const openai = new OpenAIApi(configuration);

export async function chat(message,user) {

    const config = {
      model: cfg.model??"text-davinci-003",
      prompt: message + ', ' + cfg.getRoleplay(user),
      max_tokens: parseInt(cfg.getMaxTokens()),
      temperature: cfg.getTemperature(),
      n:1
      
    }

    console.log('[SVR] ' + JSON.stringify(config))
    const response = await openai.createCompletion(config);
    const text = response.data.choices[0].text
    console.log('[SVR] response: '+text)
    console.log('[SVR] token cost: '+response.data.usage.total_tokens)
     return text
  }
  