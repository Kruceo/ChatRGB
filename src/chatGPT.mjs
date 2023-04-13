
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
      temperature: 0,
    }
    console.log(config)
    const response = await openai.createCompletion(config);
      console.log('[SVR] token cost: '+response.data.usage.total_tokens)
     return (response.data.choices[0].text)
  }
  