export class KeyManager {
    constructor() {
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
        }

        this.get = (guildID) => {
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
