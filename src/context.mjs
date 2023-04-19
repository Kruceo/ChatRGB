export class ContextManager{
    constructor(){
        this.contexts = {}

        this.appendContext = (id,text)=>{
            if(!this.contexts[id])this.contexts[id] = []
            this.contexts[id].push(text)
        }
        this.getContext = (id)=>{
            if(!this.contexts[id])return ''
            let res = ''
            this.contexts[id].forEach(each=>{
                res += each + '\n'
            })
            return res.slice(0,res.length -1)
        }
        this.setContext = (id,array)=>{
            this.contexts[id] = []
        }
    }
}