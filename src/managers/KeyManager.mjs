import fs from 'fs'
import path from 'path';
import { logger } from '../config.mjs';

export class KeyManager {
    constructor(savePath) {
        const keysFile = path.resolve(savePath,'keys.conf')
        /**
         * Keys DB
         * @type {Key[]}
         */
        this.keys = [];
        this.push = (guildID, key) => {
            let selector = -1;
            this.keys.forEach((each, index) => {
                if (each.guild == guildID) {
                    selector = index;
                }
            })
            if (selector >= 0) this.keys[selector].key = key;
            else this.keys.push(new Key(guildID, key));

            fs.writeFileSync(keysFile,JSON.stringify(this.keys))            
        }

        this.get = (guildID) => {
            if(!fs.existsSync(keysFile)){
                return null
            }
            try {
                this.keys = JSON.parse(fs.readFileSync(keysFile,'utf-8'))
            } catch (error) {
                logger.error(error)
                return null
            }
            
            const selector = this.keys.filter(each => {
                if (each.guild == guildID) {
                    return each
                }
            });
            if (selector.length > 0) return selector[0].key;
            return null
        }
    }
}

class Key {
    constructor(guild, key) {
        this.guild = guild;
        this.key = key
    }
}

export class getKeyResult {
    constructor(success, key) {
        this.success = success
        this.key = key
    }
}