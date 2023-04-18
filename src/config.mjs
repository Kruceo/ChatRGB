import fs, { mkdirSync } from 'fs'
import path, { parse } from 'path'
import { getConfigObj, getDevKeys } from './utils.mjs'


class Config {
  constructor() {
    this.contextTimeout = 2 * 1000 * 60
    this.contextTime = (new Date()).getTime() + this.contextTimeout
    this.configPath = path.resolve(process.cwd(), 'data', 'memory')

    if (process.argv.includes('-cp')) {
      this.configPath = path.resolve(process.argv[process.argv.indexOf('-cp') + 1], './')
    }

    this.configFile = path.resolve(this.configPath, 'config.conf')

    console.log('[SVR] path: ' + this.configPath)

    console.log('[SVR] file: ' + this.configFile)

    if (!fs.existsSync(path.resolve(this.configPath))) {
      mkdirSync(this.configPath, { recursive: true })
    }
    if (!fs.existsSync(path.resolve(this.configFile))) {
      fs.writeFileSync(path.resolve(this.configFile), 'discord_key=write with your key\nopenai_key=write with your key\nmodel=text-davinci-003\ncontextual=true')
      // throw new Error('Config.env not exist,will be created on ' + this.configFile)
    }

    console.log('[SVR] ----------------- NORMAL MODE ------------------')
    console.log('[SVR] *IMPORTANT* Remember to write your keys in the config file at data/memory/config.env')
    this.getter = getConfigObj

    this.getRoleplay = (name) => { return getRoleplay(path.resolve(this.configPath, 'roleplay.conf'), name) }
    this.getContext = () => {
      if (this.enable_context.replaceAll(' ','') == 'true')
        return getContext(path.resolve(this.configPath, 'context.conf'),this.context_length)
      else {
        return ''
      }
    }
    this.addContext = (text) => {
      return addContext(path.resolve(this.configPath, 'context.conf'), text, (path) => {
        if ((new Date()).getTime() >= this.contextTime) {
          fs.writeFileSync(path, '')
        }
        this.contextTime = (new Date()).getTime() + this.contextTimeout
      })
    }
  }

  get discord_key() {

    return this.getter(this.configFile).get('discord_key', 'write a key here')
  }
  get openai_key() {
    return this.getter(this.configFile).get('openai_key', 'write a key here')
  }
  get model() {
    return this.getter(this.configFile).get('model', 'text-davinci-003')
  }
  get temperature() {
    return this.getter(this.configFile).get('temperature', '0.5')
  }
  get maxtokens() {
    return this.getter(this.configFile).get('maxtokens', '128')
  }
  get enable_context() {
    return this.getter(this.configFile).get('enable_context', 'true')
  }
  get context_length() {
    return this.getter(this.configFile).get('context_length', '5')
  }
}

export const cfg = new Config()

function getRoleplay(path, name) {
  if (fs.existsSync(path)) {
    return fs.readFileSync(path, 'utf-8').replaceAll('#USER#', name ?? 'onichan')
  }
  else {
    fs.writeFileSync(path, 'me responda como um pirata triste e me chamando de #USER#')
    return 'me responda como um pirata triste e me chamando de #USER#'.replaceAll('#USER#', name ?? 'onichan')
  }
}

export const setRoleplay = (text) => {
  fs.writeFileSync('./data/memory/roleplay.conf', text)
}


export const getContext = (path,length) => {
  if (fs.existsSync(path)) {
    let textSplited = fs.readFileSync(path, 'utf-8').split('\n')
    console.log(textSplited)

    let parsed = ''
    textSplited.forEach((each, index) => {
      if (index >= textSplited.length - length) {
        if(each.length > 0)
        parsed += each + '\n'
      }
    })
    return parsed
  }
  else {
    fs.writeFileSync(path, '')
    return 0.5
  }
}
export const addContext = (path, text, beforeCallback) => {
  beforeCallback ? beforeCallback(path) : null
  fs.appendFileSync(path, text + '\n')
  return

}