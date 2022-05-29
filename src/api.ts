import DB from "./db.js"
import enc from "./enc.js"

async function api(method: string, req?: any) {
    switch (method) {
        case "get": return "hehe"; break;
        case "corps":
            return await DB.getCorps()
            break
        case "floors":
            return await DB.getFloorCount(req.corpId)
            break
        case "rooms":
            return await DB.getRooms(req.corpId, req.floor)
            break
        case "search":
            return await DB.getStudents(req.fio, req.corpId, req.floor, req.number)
            break
        case "student":
            return await DB.getStudentInfo(req.cardNum)
            break
        case "roomId":
            return await DB.getRoomID(req.corpId, req.floor, req.number)
            break
        case "newStudent":
            DB.setStudentInfo(req.FIO, req.birthDate, req.orderDorm, req.orderEnroll, req.enrollDate, req.birthPlace, req.address, req.roomId)
            break
        case "addCorp":
            DB.addCorp(req.name)
            break
        case "removeCorp":
            DB.removeCorp(req.corpId)
            break
        case "addRoom":
            DB.addRoom(req.roomNumber, req.floor, req.corpId)
            break
        case "removeRoom":
            DB.removeRoom(req.roomId)
            break

    }
    return ("api is loaded")
}

export default api