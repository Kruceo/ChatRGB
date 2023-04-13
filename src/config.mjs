import fs from 'fs'
import path from 'path'
import { getConfigObj, getDevKeys } from './utils.mjs'


class Config {
  constructor() {
    this.renew = () => {
      if (!fs.existsSync(path.resolve(process.cwd(), 'data', 'memory', 'config.env'))) {
        try {
          mkdirSync(path.resolve(process.cwd(), 'data', 'memory'), { recursive: true })
        } catch (error) {
          console.error("###############################\n\n", error, '\n\n##############################')
        }
        fs.writeFileSync(path.resolve(process.cwd(), 'data', 'memory', 'config.env'), 'discord_key=write with your key\nopenai_key=write with your key\nmodel=text-davinci-003')
        throw new Error('Config.env not exist,will be created on ' + path.resolve(process.cwd(), 'data', 'memory', 'config.env'))
      }
     
      if (process.argv[2] == 'dev') {
        this.getter = getDevKeys
        console.log('[SVR] ----------------- DEVELOPER MODE ------------------')
        console.log('[SVR] *IMPORTANT* Write your keys a folder out of project folder with name "chatrgb.env"')
        console.log('[SVR] getter', this.getter.name)
      }
      else{
        console.log('[SVR] ----------------- NORMAL MODE ------------------')
        console.log('[SVR] *IMPORTANT* Remember to write your keys in the config file at data/memory/config.env')
        this.getter = getConfigObj
      }
    }

    this.renew()
  }

  get discord_key (){

    return this.getter(path.resolve(process.cwd(),'data','memory','config.env')).discord_key
  }
  get openai_key (){
    return this.getter(path.resolve(process.cwd(),'data','memory','config.env')).openai_key
  }
}

export const cfg = new Config()


function getRoleplay(name) {
  if (fs.existsSync('./data/memory/roleplay.conf')) {
    return fs.readFileSync('./data/memory/roleplay.conf', 'utf-8').replaceAll('#USER#', name ?? 'onichan')
  }
  else {
    fs.writeFileSync('./data/memory/roleplay.conf', 'me responda como uma garota de anime animada usando girias e me chamando por um apelido carinhoso para #USER#')
    return 'me responda como uma garota de anime animada usando girias e me chamando por um apelido carinhoso para #USER#'.replaceAll('#USER#', name ?? 'onichan')
  }
}

function getMaxTokens() {
  if (fs.existsSync('./data/memory/maxtoken.conf')) {
    return fs.readFileSync('./data/memory/maxtoken.conf', 'utf-8')
  }
  else {
    fs.writeFileSync('./data/memory/maxtoken.conf', '255')
    return 255
  }
}

export const setRoleplay = (text) => {
  fs.writeFileSync('./data/memory/roleplay.conf', text)
}