// import { client } from "../index.mjs";
import fs from 'fs'
import path from 'path';
import { logger } from './config.mjs';


export function getMainChannels(client) {
  const channels = client.channels.cache.filter(each => {
    if (each.rawPosition == 0 && each.type == 0) return each
  });
  return channels
}

export function getDevKeys() {
  const obj = getConfigObj(path.resolve(process.cwd(),'../','chatrgb.env'))
  return obj
}

export function getConfigObj(path) {
  const file = fs.readFileSync(path, 'utf-8') + '\n'

  let obj = {
    data:{},
    get:(item,defaultValue)=>{
      if(obj.data[item]){
        return obj.data[item]
      }
      else{
        if(!file.endsWith('\n'))fs.appendFileSync(path,'\n')
        fs.appendFileSync(path,item + '=' + defaultValue+'\n')
        return defaultValue
      }
    }

  }

  file.split('\n').forEach(each => {
    const [prop, value] = each.split('=')
    if (prop == undefined || value == undefined) {
      if(prop.length==0)return null
      logger.warn('[SVR] The config.env have undefined itens. \n  {' + prop + '=' + value + '} => This can cause errors!')
    }
    obj.data[prop] = value
  })
  return obj
}