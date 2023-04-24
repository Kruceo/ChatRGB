import fs from 'fs'
import path from 'path';

export class KeyManager {
    constructor(savePath) {
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

            fs.writeFileSync(path.resolve(savePath,'keys.conf'),JSON.stringify(this.keys))            
        }

        this.get = (guildID) => {
            this.keys = JSON.parse(fs.readFileSync(path.resolve(savePath,'keys.conf'),'utf-8'))
            const selector = this.keys.filter(each => {
                if (each.guild == guildID) {
                    return each
                }
            });
            if (selector.length > 0) return selector[0];
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