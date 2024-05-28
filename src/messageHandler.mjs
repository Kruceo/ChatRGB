import { GoogleGenerativeAI } from "@google/generative-ai";
import { Message } from "discord.js";
import fs from 'fs'
import { getRoleplayForChannel } from "./roleplayManager.mjs";
import { contentSplitter } from "./utils.mjs";
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GENAI_TOKEN);

/**
 * @param {import("discord.js").Message} discordMessage 
 */
export async function messageHandler(discordMessage) {
  if (discordMessage.author.bot) return;
  const splitedContent = contentSplitter(discordMessage)
  if (splitedContent[0] != "chat") return;

  discordMessage.channel.sendTyping()

  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const preChat = await genPreChat(discordMessage)

  fs.writeFileSync("test.json", JSON.stringify(preChat, null, 2));

  const modelChat = model.startChat(preChat);

  const msg = splitedContent[1];
  console.log("sending", msg)
  const result = await modelChat.sendMessage(msg);
  const response = await result.response;
  const text = response.text();
  if (!text || text.trim() == "")
    return messageHandler(discordMessage)
  discordMessage.channel.send(text)

}

/**
 * Generate a pre chat for a better completion based in the channel messages
 * @param {import("discord.js").Message} discordMessage 
 */
async function genPreChat(discordMessage) {
  /**
   * @type {import("discord.js").Collection<string,Message<true>>}
   */
  var messages = (await discordMessage.channel.messages.fetch({ limit: 7 }))

  const history = messages.reverse().reduce((acum, next, currentIndex) => {
    // return se o index for o ultimo, pq é a mensagem que o usuario ta mandando
    if (/^(!|\/|\\)/.test(next.content)) return acum
    if (currentIndex == messages.keyAt(messages.size - 1))
      return acum

    const currentRole = next.author.username == next.client.user.username ? "model" : "user"
    //se o objecto anterior existir e ter o role igual a o atual, ira concatenar essa msg em "parts" do item anterior 
    if (acum[acum.length - 1] && acum[acum.length - 1].role == currentRole) {
      acum[acum.length - 1].parts.push({ text: next.content })
      return acum
    }
    acum.push({ role: currentRole, parts: [{ text: next.content }] })
    return acum
  }, [{ role: "user", parts: [{ text: getRoleplayForChannel(discordMessage.channelId) ?? "just reply" }] }])

  if (history[history.length - 1].role != "model") {
    history.push({ role: "model", parts: [{ text: "" }] })
  }
  const preChat = {
    history: [...history],
    generationConfig: {
      maxOutputTokens: 600,
    },
    __toSend: discordMessage.content
  }

  return preChat

}
/**
 * 
 * @param {{history:{role:string,parts:{text:string}[]}[]}} modelChat 
 */
function filterModelChat(modelChat) {
  let newChat = { ...modelChat }

  newChat.history = modelChat.history.map(each => {
    each.parts = each.parts.filter(part => !/^(\!|\/|\$)/.test(part.text))
    return each
  })

  newChat.history.filter(each => each.parts.length > 0)
  return newChat
}
