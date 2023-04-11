import fs from 'fs'

function getRoleplay(){
    if(fs.existsSync('./data/memory/roleplay.chat')){
        return fs.readFileSync('./data/memory/roleplay.chat','utf-8')
    }
    else{
        fs.writeFileSync('./data/memory/roleplay.chat','fale como uma garota de anime e usando girias')
        return 'fale como uma garota de anime usando girias'
    }
}


export const roleplay = getRoleplay()

export const setRoleplay = (text)=>{
    fs.writeFileSync('./data/memory/roleplay.chat',text)
}