import { ApplicationCommandOptionType, Client, InteractionType } from "discord.js";
import { genChannelID } from './utils.mjs'
import { cfg } from "./config.mjs";
import { chat } from "./bot/chatGPT.mjs";


/**
 * Init the commands at each guild
 * @param {Client} client 
 */
export default async function initCommands(client) {


    ((await client.application.commands.fetch()).clear())
    client.guilds.cache.forEach(async element => {
        (await element.commands.fetch()).clear()
    })

    await client.application.commands.create(
        {
            name: 'setroleplay',
            description: 'Set the channel roleplay',
            options: [{
                name: "roleplay",
                description: 'The roleplay that the bot will use',
                type: ApplicationCommandOptionType.String,
                required: true
            }]
        })

    await client.application.commands.create(
        {
            name: 'getroleplay',
            description: 'Get the channel roleplay',
        })

    await client.application.commands.create(
        {
            name: 'setkey',
            description: 'set the server API key',
            options: [{
                name: "key",
                description: 'The key to use',
                type: ApplicationCommandOptionType.String,
                required: true
            }]
        })
    await client.application.commands.create(
        {
            name: 'help',
            description: 'show a the ChatRGB command list',
        })

    client.on('interactionCreate', async (data) => {
        if (data.commandName == 'setroleplay') {
            const text = await (data.options.getString('roleplay'))

            cfg.roleplay_manager.setRoleplay(genChannelID(data), text)

            data.reply('ok')
        }
        if (data.commandName == 'getroleplay') {
            data.reply(cfg.roleplay_manager.getRoleplay(genChannelID(data)))
        }
        if (data.commandName == 'setkey') {
            const key = await (data.options.getString('key')) ?? "not defined"
            cfg.key_manager.push(data.guildId, key)
            data.reply('Key as applied, test using "chat hello"')
        }
        if (data.commandName == 'help') {
            data.reply(
`# Welcome to the help!

To start a chat, simply type \`chat\` followed by your message. For example, if you want to say "Good morning", just type \`chat Good morning\`.

If you need to set a new API key, simply send \`/setkey\` followed by your new API key. For example, if your new API key is \`"MyNewAPIKey"\`, type \`/setkey key:MyNewAPIKey\`.

To set a new roleplay, send \`/setroleplay\` followed by your new roleplay. For example, if you want to roleplay as a Japan samurai and respond accordingly, type \`/setroleplay roleplay:respond like a Japan samurai\`.

If you need further assistance, don't hesitate to ask!
`)
        }
    })
}