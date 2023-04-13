// import { client } from "../index.mjs";
import fs, { existsSync } from 'fs'


export function getMainChannels(client){
    const channels = client.channels.cache.filter(each => {
        if (each.rawPosition == 0 && each.type == 0) return each
      });
      return channels
}
