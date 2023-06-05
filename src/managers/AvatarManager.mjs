import { cfg, logger } from "../config.mjs"

export default class AvatarManager {
    constructor(client) {
        this.client = client
        this.changeAvatarCycle()
        this.stopped = false
    }

    async changeAvatarCycle() {
        try {
            const req = await fetch('https://tenor.com/pt-BR/search/'+cfg.avatar_search+'-gifs')
            const text = await req.text()
            const matches = text.match(/https:\/\/media\.tenor\.com\/([^"]*?)\.gif/g)
            const random = Math.floor(Math.random() * matches.length)
            const selection = matches[random]
            if (this.client && this.client.user) this.client.user.setAvatar(selection)
            logger.info('New avatar: '+ selection)
            setTimeout(() => this.changeAvatarCycle(),
                // 10000 + (10000 - Math.random()*10000)
                12*3600*1000
            )
        } catch (error) {
            logger.error('Error on avatar change')
        }

    }
}
