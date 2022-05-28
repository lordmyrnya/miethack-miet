import sqlite from 'sqlite-async'
const db = await sqlite.open('./db/students.db')
namespace DB {
    export async function getCorps() {
        // const sql = 'SELECT corpId,MAX(floor) FROM corps INNER JOIN rooms ON corps.corpId=rooms.corpId'
        const corpsIds = 'SELECT corpId,name FROM corps'
        const result = await db.all(corpsIds)
        return result
    }

    export async function getFloorCount(corpId: number) {
        const floorCount = `SELECT MAX(floor) FROM rooms WHERE corpId=${corpId}`
        const result = await db.get(floorCount)
        return result
    }

    export async function getRooms(corpId: number, floor: number) {
        const rooms = `SELECT number FROM rooms WHERE corpId=${corpId} AND floor=${floor}`
        const result = await db.all(rooms)
        return result
    }

    export async function getPeopleInRoom(roomNumber: number){
        const people = `SELECT students.* FROM rooms INNER JOIN students ON rooms.roomId=students.roomId WHERE number=${roomNumber}`
        const result = await db.all(people)
        return result
    }

    export async function getPeopleInRoomId(roomId: number){
        const people = `SELECT students.* FROM rooms INNER JOIN students ON rooms.roomId=students.roomId WHERE number=${roomId}`
        const result = await db.all(people)
        return result
    }

    export async function getStudentInfo(student){}
}

export default DB