import fs from 'fs'
import { cfg, logger } from '../config.mjs'

export class ContextManager {
    constructor(config_path) {
        /**
         * @type {Context[]}
         */
        this.contexts = {}

        this.appendContext = (id, text) => {
            if (!this.contexts[id]) {
                this.contexts[id] = new Context(text)
                return
            }
            if (this.contexts[id].timer <= (new Date().getTime())) {

                this.contexts[id].text = [] //reset context
            }
            this.timer = (new Date()).getTime() + cfg.context_timeout
            this.contexts[id].text.push(text)

        }
        this.getContext = (id) => {
            if (!this.contexts[id]) return ''
            let res = ''
            this.contexts[id].text.forEach((each, index) => {
                if (index > this.contexts[id].text.length - cfg.context_length)
                    res += each + '\n'
            })
            console.log(this.contexts[id].text)
            logger.warn('time: ' + this.contexts[id].timer + ' / ' + (new Date()).getTime())
            return res.slice(0, res.length)
        }
        this.setContext = (id, array) => {
            this.contexts[id].text = array
        }
    }
}

export class Context {
    constructor(text) {
        this.text = [text]
        this.timer = (new Date()).getTime() + parseInt(cfg.context_timeout)
    }
}