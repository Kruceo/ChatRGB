import fs from 'fs'
import { cfg } from './config.mjs'
import path from 'path'


export class RoleplayManager {
    constructor(config_path) {
        const roleplayPath = path.resolve(config_path, 'roleplay.conf')
        const setDefault = () => {
            const text = '{"any":"me responda como um pirata triste se referindo a mim por uma apelido para #USER#"}'
            fs.writeFileSync(roleplayPath, text)
            return text
        }
        function getRoleplaysFromFiles() {
            if (!fs.existsSync(roleplayPath)) setDefault()
            let file = fs.readFileSync(roleplayPath, 'utf-8')
            if (!file.endsWith('}') || !file.startsWith('{')) {
                file = setDefault()
            }
            const obj = JSON.parse(file)
            return obj
        }

        this.roleplays = {}
        if (!fs.existsSync(roleplayPath)) {
            this.roleplays = getRoleplaysFromFiles()
        }

        this.getRoleplay = (id) => {
            this.roleplays = getRoleplaysFromFiles()
            if (!this.roleplays[id]) return this.roleplays.any
            return this.roleplays[id]
        }
        this.setRoleplay = (id, text) => {
            this.roleplays = getRoleplaysFromFiles()
            this.roleplays[id] = text
            fs.writeFileSync(roleplayPath, JSON.stringify(this.roleplays))
        }
    }
}