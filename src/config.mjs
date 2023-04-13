import fs, { mkdirSync } from 'fs'
import path from 'path'
import { getConfigObj, getDevKeys } from './utils.mjs'


class Config {
  constructor() {

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
      fs.writeFileSync(path.resolve(this.configFile), 'discord_key=write with your key\nopenai_key=write with your key\nmodel=text-davinci-003')
      // throw new Error('Config.env not exist,will be created on ' + this.configFile)
    }

    if (process.argv[2] == 'dev') {
      this.getter = getDevKeys
      console.log('[SVR] ----------------- DEVELOPER MODE ------------------')
      console.log('[SVR] *IMPORTANT* Write your keys a folder out of project folder with name "chatrgb.env"')
      console.log('[SVR] getter', this.getter.name)
    }
    else {
      console.log('[SVR] ----------------- NORMAL MODE ------------------')
      console.log('[SVR] *IMPORTANT* Remember to write your keys in the config file at data/memory/config.env')
      this.getter = getConfigObj
    }

    this.getRoleplay = (name) => getRoleplay(path.resolve(this.configPath, 'roleplay.conf'), name)
    this.getMaxTokens = () => getMaxTokens(path.resolve(this.configPath,'maxtokens.conf'))
    this.getTemperature = ()=>{ getTemperature(path.resolve(this.configPath,'temperature.conf'))}
  }

  get discord_key() {

    return this.getter(this.configFile).discord_key
  }
  get openai_key() {
    return this.getter(this.configFile).openai_key
  }
  get model() {
    return this.getter(this.configFile).model
  }
  get
}

export const cfg = new Config()

function getRoleplay(path, name) {
  if (fs.existsSync(path)) {
    return fs.readFileSync(path, 'utf-8').replaceAll('#USER#', name ?? 'onichan')
  }
  else {
    fs.writeFileSync(path, 'me responda como uma garota de anime animada usando girias e me chamando por um apelido carinhoso para #USER#')
    return 'me responda como uma garota de anime animada usando girias e me chamando por um apelido carinhoso para #USER#'.replaceAll('#USER#', name ?? 'onichan')
  }
}

function getMaxTokens(path) {
  if (fs.existsSync(path)) {
    return fs.readFileSync(path, 'utf-8')
  }
  else {
    fs.writeFileSync(path, '255')
    return 255
  }
}

function getTemperature(path) {
  if (fs.existsSync(path)) {
    return parseFloat(fs.readFileSync(path, 'utf-8'))
  }
  else {
    fs.writeFileSync(path, '255')
    return 0.5
  }
}

export const setRoleplay = (text) => {
  fs.writeFileSync('./data/memory/roleplay.conf', text)
}