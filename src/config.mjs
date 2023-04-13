import fs from 'fs'
import path from 'path'


class Config{
  constructor(){
   
    if(!fs.existsSync(path.resolve(process.cwd(),'data','memory','config.env'))){
      fs.writeFileSync(path.resolve(process.cwd(),'data','memory','config.env'),'discord_key=write with your key\nopenai_key=write with your key\nmodel=text-davinci-003')
      throw new Error('Config.env not exist,will be created on '+path.resolve(process.cwd(),'data','memory','config.env'))
    }

    const file = fs.readFileSync(path.resolve(process.cwd(),'data','memory','config.env'),'utf-8') + '\n'

    console.log(file)
    let obj = {}
  
    file.split('\n').forEach(each=>{
      const [prop,value] = each.split('=')
      if(prop == undefined||value == undefined){
        console.error('[SVR] The config.env have undefined itens. \n  {' + prop + '=' + value + '} => This can cause errors!')
      }
      obj[prop] = value
    })

    this.discord_key = obj.discord_key
    this.openai_key = obj.openai_key
    this.model = obj.model
    this.getRoleplay = getRoleplay
    this.getMaxTokens = getMaxTokens
  } 
}

export const cfg = new Config()

console.log('###',cfg.maxTokens)
function getRoleplay(name){
    if(fs.existsSync('./data/memory/roleplay.conf')){
        return fs.readFileSync('./data/memory/roleplay.conf','utf-8').replaceAll('#USER#',name??'onichan')
    }
    else{
        fs.writeFileSync('./data/memory/roleplay.conf','me responda como uma garota de anime animada usando girias e me chamando por um apelido carinhoso para #USER#')
        return 'me responda como uma garota de anime animada usando girias e me chamando por um apelido carinhoso para #USER#'.replaceAll('#USER#',name??'onichan')
    }
}

function getMaxTokens(){
    if(fs.existsSync('./data/memory/maxtoken.conf')){
        return fs.readFileSync('./data/memory/maxtoken.conf','utf-8')
    }
    else{
        fs.writeFileSync('./data/memory/maxtoken.conf','255')
        return 255
    }
}

export const setRoleplay = (text)=>{
    fs.writeFileSync('./data/memory/roleplay.conf',text)
}