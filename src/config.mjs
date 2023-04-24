import fs, { mkdirSync, writeFileSync } from 'fs'
import path from 'path'
import { getConfigObj } from './utils.mjs'
import { Logger } from 'madeira'

import { RoleplayManager } from './RoleplayManager.mjs'
import { ContextManager } from './ContextManager.mjs'
import { KeyManager } from './KeyManager.mjs'

export const logger = new Logger('./logs')

logger.info("Running version: " + JSON.parse(fs.readFileSync('./package.json')).version)

class Config {
  constructor() {
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
      writeFileSync(this.config_file, '')

    }

    //managers
    this.roleplay_manager = new RoleplayManager(this.config_path)
    this.context_manager = new ContextManager()
    this.key_manager = new KeyManager(this.config_path)

    //set the getter method
    this.getter = getConfigObj;

    logger.info('config path: ' + this.config_path);
    logger.info('config file: ' + this.config_file);

    //configure first moment context timer
    this.context_time = (new Date()).getTime() + parseInt(this.context_timeout);

    //roleplay and context getter with personalization like user name

  }

  get get_config_path() {
    return this.config_path
  }
  get discord_key() {

    return this.getter(this.config_file).get('discord_key', 'write a key here')
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
