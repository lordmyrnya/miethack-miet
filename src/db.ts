import sqlite from 'sqlite-async'
import enc from './enc.js'
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

    export async function getPeopleInRoom(roomNumber: number) {
        const people = `SELECT students.* FROM rooms INNER JOIN students ON rooms.roomId=students.roomId WHERE number=${roomNumber}`
        const result = await db.all(people)
        return result
    }

    export async function getPeopleInRoomId(roomId: number) {
        const people = `SELECT students.* FROM rooms INNER JOIN students ON rooms.roomId=students.roomId WHERE number=${roomId}`
        const result = await db.all(people)
        return result
    }

    export async function getStudentInfo(cardNum: number) {
        const student = `SELECT * FROM students WHERE cardNum=${cardNum}`
        const result = await db.get(student)
        return result
    }

    export async function getStudents(FIO: string, corpId: number, floor: number, roomNumber: number) {
        let sql = "SELECT students.cardNum, students.FIO, corps.corpId, rooms.floor, rooms.number FROM rooms INNER JOIN students ON rooms.roomId=students.roomId INNER JOIN corps ON rooms.corpId=corps.corpId"
        let where = false
        if (FIO) { if (!where) { sql += " WHERE "; where = true } else sql += " AND "; sql += `students.FIO="${FIO}"` }
        if (corpId) { if (!where) { sql += " WHERE "; where = true } else sql += " AND "; sql += `rooms.corpId="${corpId}"` }
        if (floor) { if (!where) { sql += " WHERE "; where = true } else sql += " AND "; sql += `rooms.floor="${floor}"` }
        if (roomNumber) { if (!where) { sql += " WHERE "; where = true } else sql += " AND "; sql += `rooms.number="${roomNumber}"` }
        sql+=" GROUP BY rooms.number"
        console.log(sql)
        let result = await db.all(sql)
        return result
    }
}

export default DB