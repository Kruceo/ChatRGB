import { ApplicationCommandOptionType, Client, InteractionType } from "discord.js";
import {genClientID} from './utils.mjs'
import { cfg } from "./config.mjs";


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

    client.on('interactionCreate', async (data) => {
        if (data.commandName == 'setroleplay') {
            const text = await (data.options.getString('roleplay'))

            cfg.roleplay_manager.setRoleplay(genClientID(data), text)

            data.reply('ok')
        }
        if (data.commandName == 'getroleplay') {
            data.reply(cfg.roleplay_manager.getRoleplay(genClientID(data)))
        }
        if (data.commandName == 'setkey') {
            const key = await (data.options.getString('key'))??"not defined"
            cfg.key_manager.push(data.guildId,key)
            data.reply('Key as applied, test using "chat hello"')
        }
    })
}