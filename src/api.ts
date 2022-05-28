import {enc as CTSEnc, AES as cipher} from "crypto-ts"

namespace api{
    namespace DB{
        export function open(){

        }
    }

    namespace enc{}

    export function defaultAction(req: any){
        console.log("asd")
        console.log(req)
        return("api is loaded")
    }
}

export default api