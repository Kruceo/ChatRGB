import fs from 'fs'
import { cfg } from './config.mjs'
import path from 'path'


export class RoleplayManager {
    constructor(config_path) {
        console.log(config_path)
        const roleplayPath = path.resolve(config_path, 'roleplay.conf')

        function getRoleplaysFromFiles() {
            console.log('getting')
            const obj = JSON.parse(fs.readFileSync(roleplayPath))
            return obj
        }

        this.roleplays = {}
        if (!fs.existsSync(roleplayPath)) {
            this.roleplays = getRoleplaysFromFiles()
        }

        this.getRoleplay = (id) => {
            this.roleplays = getRoleplaysFromFiles()
            if (!this.roleplays[id]) return ''
            return this.roleplays[id]
        }
        this.setRoleplay = (id, text) => {
            this.roleplays = getRoleplaysFromFiles()
            this.roleplays[id] = text
            fs.writeFileSync(roleplayPath, JSON.stringify(this.roleplays))
        }
    }
}