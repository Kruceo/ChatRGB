import { Message } from "discord.js";
import { contentSplitter } from "./utils.mjs";
import { setRoleplayForChannel } from "./roleplayManager.mjs";

/**
 * The roleplay handler to discord chat
 * @param {Message} discordMessage 
 */
export function roleplayCommandHandler(discordMessage){
   const splited = contentSplitter(discordMessage)

   if(splited[0]!=="!setroleplay")return

   setRoleplayForChannel(discordMessage.channelId,splited[1])

   discordMessage.reply("ok...")
}