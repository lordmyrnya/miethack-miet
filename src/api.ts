import DB from "./db.js"
import enc from "./enc.js"

namespace api {

    export async function defaultAction(req: any) {
        switch (req.task) {
            case "get": return "hehe"; break;
            case "enc": return enc.encrypt(req.text || "test", "haha"); break;
            case "dec": return enc.decrypt(req.text || "test", "haha"); break;
            case "db":
                const result = JSON.stringify(await DB.getCorps())
                return result
                break
        }
        return ("api is loaded")
    }
}

export default api