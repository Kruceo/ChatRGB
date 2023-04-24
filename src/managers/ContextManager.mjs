import fs from 'fs'
import { cfg } from '../config.mjs'

export class ContextManager{
    constructor(config_path){
        this.contexts = {}

        this.appendContext = (id,text)=>{
            if(!this.contexts[id])this.contexts[id] = []
            this.contexts[id].push(text)
        }
        this.getContext = (id)=>{
            if(!this.contexts[id])return ''
            let res = ''
            this.contexts[id].forEach((each,index)=>{
                if(index > this.contexts[id].length - cfg.context_length)
                res += each + '\n'
            })
            console.log(this.contexts)
            return res.slice(0,res.length)
        }
        this.setContext = (id,array)=>{
            this.contexts[id] = array
        }
    }
}