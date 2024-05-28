import fs from "fs"

const dirPath = "./data"
const filePath = "./data/roleplay.json"

if(!fs.existsSync(dirPath))fs.mkdirSync(dirPath,{recursive:true})
if(!fs.existsSync(filePath))fs.writeFileSync(filePath,"{}")

export function getRoleplayForChannel(channelID){
    const rawObj = fs.readFileSync(filePath,"utf8")
    const obj = JSON.parse(rawObj)

    return obj[channelID]
}

export function setRoleplayForChannel(channelID,roleplay){
    const rawObj = fs.readFileSync(filePath,"utf8")
    const obj = JSON.parse(rawObj)

    obj[channelID] = roleplay
    fs.writeFileSync(filePath,JSON.stringify(obj))
}