import axios from "axios";
import { cfg } from "./utils.mjs";
import { Configuration, OpenAIApi } from "openai"
import { max_tokens, roleplay } from "./config.mjs";

const configuration = new Configuration({
  apiKey: cfg.APIKEY,
});
const openai = new OpenAIApi(configuration);

export async function chat(message,user) {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: message + ', ' + roleplay(user),
        max_tokens: max_tokens(),
        temperature: 0,
      });
      console.log('[SVR] token cost: '+response.data.usage.total_tokens)
     return (response.data.choices[0].text)
  }
  
