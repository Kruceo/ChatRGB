// import { client } from "../index.mjs";
import {config} from 'dotenv'
export const cfg = config().parsed
export function getMainChannels(client){
    const channels = client.channels.cache.filter(each => {
        if (each.rawPosition == 0 && each.type == 0) return each
      });
      return channels
}