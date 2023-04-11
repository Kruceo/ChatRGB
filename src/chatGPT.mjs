import axios from "axios";
import { cfg } from "./utils.mjs";
import { Configuration, OpenAIApi } from "openai"
import { roleplay } from "./config.mjs";

const configuration = new Configuration({
  apiKey: cfg.APIKEY,
});
const openai = new OpenAIApi(configuration);

export async function chat(message) {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        suffix:roleplay +", resposta curta",
        prompt: message,
        max_tokens: 200,
        temperature: 0.2,
      });
      console.log(response.data.usage.total_tokens)
     return (response.data.choices[0].text)
  }
  