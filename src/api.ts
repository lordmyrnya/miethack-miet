import DB from "./db.js"
import enc from "./enc.js"

namespace api{

    export function defaultAction(req: any){
        switch(req.task){
            case "get": return enc.encrypt(req.text || "test", "haha"); break;
        }
        return("api is loaded")
    }
}

export default api