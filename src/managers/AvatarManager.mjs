import { cfg, logger } from "../config.mjs"

export default class AvatarManager {
    constructor(client) {
        this.client = client
        this.timer = ((60 * 60) / 150) * 1000

        this.stopped = false

        this.next = ''
        this.old = ''
        this.cycle()
    }

    async getNewImage(search) {
        const regex = 'respond responda fale fala talk like como um uma a o'
        const s = search.split(' ').reduce((acum,next)=>{
            if(!regex.includes(next)){
                return acum +' '+ next
            }
            else return acum + ''
        },'').trim()
        console.log('search',s)
        try {
            const req = await fetch('https://tenor.com/pt-BR/search/' + s + '-gifs')
            const text = await req.text()
            const matches = text.match(/https:\/\/media\.tenor\.com\/([^"]*?)\.gif/g)
            const random = Math.round(Math.random() * matches.length)
            const selection = matches[random]
            this.next = selection

        } catch (error) {
            logger.error('Error on avatar change')
        }
    }

    cycle() {
        // console.log(this.timer)
        // console.log('proximo ciclo :' + new Date((new Date()).getTime() + this.timer))
        setTimeout(async () => {

            if (this.client && this.client.user) {
                if (this.old != this.next) {
                    this.client.user.setAvatar(this.next)
                    logger.info('New avatar: ' + this.next)
                    this.old = this.next
                }
            }
            else{
                logger.warn('Avatar Manager: Undefined client')
            }
            this.cycle()
        }, this.timer)
    }
}
