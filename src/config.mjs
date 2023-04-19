import fs, { mkdirSync, writeFileSync } from 'fs'
import path, { parse } from 'path'
import { getConfigObj, getDevKeys } from './utils.mjs'
import { Logger } from 'madeira'
import { ContextManager } from './context.mjs'
export const logger = new Logger('./logs')

class Config {
  constructor() {
    //context manager
    this.context_manager = new ContextManager()
    //resolve config paths
    this.config_path = path.resolve(process.cwd(), 'data', 'memory');
    if (process.argv.includes('-cp')) {
      this.config_path = path.resolve(process.argv[process.argv.indexOf('-cp') + 1], './');
    }
    this.config_file = path.resolve(this.config_path, 'config.conf');

    if (!fs.existsSync(this.config_path)) {
      mkdirSync(this.config_path, { recursive: true });
    
    }
    if (!fs.existsSync(this.config_file)) {
      writeFileSync(this.config_file,'')
    
    }
   
    //set the getter method
    this.getter = getConfigObj;

    logger.info('config path: ' + this.config_path);
    logger.info('config file: ' + this.config_file);

    //configure first moment context timer
    this.context_time = (new Date()).getTime() + parseInt(this.context_timeout);

    //roleplay and context getter with personalization like user name
    this.getRoleplay = (name) => { return getRoleplay(path.resolve(this.config_path, 'roleplay.conf'), name) }
  }

  get discord_key() {

    return this.getter(this.config_file).get('discord_key', 'write a key here')
  }
  get openai_key() {
    return this.getter(this.config_file).get('openai_key', 'write a key here')
  }
  get model() {
    return this.getter(this.config_file).get('model', 'text-davinci-003')
  }
  get temperature() {
    return this.getter(this.config_file).get('temperature', '0.5')
  }
  get maxtokens() {
    return this.getter(this.config_file).get('maxtokens', '128')
  }
  get enable_context() {
    return this.getter(this.config_file).get('enable_context', 'true')
  }
  get context_length() {
    return this.getter(this.config_file).get('context_length', '5')
  }
  get context_timeout() {
    return this.getter(this.config_file).get('context_timeout', '120000')
  }
}

export const cfg = new Config()

function getRoleplay(path, name) {
  if (fs.existsSync(path)) {
    return fs.readFileSync(path, 'utf-8').replaceAll('#USER#', name ?? 'onichan')
  }
  else {
    fs.writeFileSync(path, 'me responda como um pirata triste e me chamando de #USER#')
    return 'me responda como um pirata triste e me chamando de #USER#'
  }
}