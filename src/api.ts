import DB from "./db.js"
import enc from "./enc.js"

async function api(method: string, req?: any) {
    switch (method) {
        case "get": return "hehe"; break;
        case "enc": return enc.encrypt(req.text || "test", "haha"); break;
        case "dec": return enc.decrypt(req.text || "test", "haha"); break;
        case "corps":
            return await DB.getCorps()
            break
        case "floors":
            return await DB.getFloorCount(req.corpId)
            break
        case "rooms":
            return await DB.getRooms(req.corpId, req.floor)
            break
    }
    return ("api is loaded")
}

export default api