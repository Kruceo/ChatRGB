import fs from 'fs'

function getRoleplay(name){
    if(fs.existsSync('./data/memory/roleplay.chat')){
        return fs.readFileSync('./data/memory/roleplay.chat','utf-8').replaceAll('#USER#',name)
    }
    else{
        fs.writeFileSync('./data/memory/roleplay.chat','me responda como uma garota de anime animada usando girias e me chamando de #USER#')
        return 'me responda como uma garota de anime animada usando girias e me chamando de #USER#'.replaceAll('#USER#',name)
    }
}

function getMaxTokens(){
    if(fs.existsSync('./data/memory/maxtoken.chat')){
        return fs.readFileSync('./data/memory/maxtoken.chat','utf-8')
    }
    else{
        fs.writeFileSync('./data/memory/maxtoken.chat','255')
        return 255
    }
}


export const roleplay = getRoleplay
export const max_tokens = getMaxTokens

export const setRoleplay = (text)=>{
    fs.writeFileSync('./data/memory/roleplay.chat',text)
}
