import sqlite from 'sqlite-async'
import enc from './enc.js'
import 'dotenv/config'
import { futimes } from 'node:fs'
const pass = process.env.SECRETPASSWORD
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

    export async function getRoomID(corpId: number, floor: number, roomNumber: number) {
        const rooms = `SELECT roomId FROM rooms WHERE corpId=${corpId} AND floor=${floor} AND number=${roomNumber}`
        const result = await db.get(rooms)
        return result
    }

    export async function getPeopleInRoom(roomNumber: number) {
        const people = `SELECT students.* FROM rooms INNER JOIN students ON rooms.roomId=students.roomId WHERE number=${roomNumber}`
        const result = await db.all(people)
        return result
    }

    export async function getPeopleCountInRoom(roomNumber: number) {
        const people = `SELECT COUNT(*) FROM rooms INNER JOIN students ON rooms.roomId=students.roomId WHERE number=${roomNumber}`
        const result = (await db.all(people))["COUNT(*)"]
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
        result.FIO = enc.decrypt(result.FIO, pass, undefined, enc.convertFromHex(result.iv))
        result.birthDate = enc.decrypt(result.birthDate, pass, undefined, enc.convertFromHex(result.iv))
        result.birthPlace = enc.decrypt(result.birthPlace, pass, undefined, enc.convertFromHex(result.iv))
        result.address = enc.decrypt(result.address, pass, undefined, enc.convertFromHex(result.iv))

        console.log(result)
        return result
    }

    export async function getStudents(FIO: string, corpId: number, floor: number, roomNumber: number) {
        let sql = "SELECT students.cardNum, students.FIO, corps.name, rooms.floor, rooms.number, students.iv FROM rooms INNER JOIN students ON rooms.roomId=students.roomId INNER JOIN corps ON rooms.corpId=corps.corpId"
        let where = false
        if (FIO) { if (!where) { sql += " WHERE "; where = true } else sql += " AND "; sql += `students.FIO LIKE "%${FIO}%"` }
        if (corpId) { if (!where) { sql += " WHERE "; where = true } else sql += " AND "; sql += `rooms.corpId="${corpId}"` }
        if (floor) { if (!where) { sql += " WHERE "; where = true } else sql += " AND "; sql += `rooms.floor="${floor}"` }
        if (roomNumber) { if (!where) { sql += " WHERE "; where = true } else sql += " AND "; sql += `rooms.number="${roomNumber}"` }
        //sql+=" GROUP BY rooms.number"
        let result = await db.all(sql)
        for (let i = 0; i < result.length; i++)
            result[i].FIO = enc.decrypt(
                result[i].FIO,
                pass,
                undefined,
                enc.convertFromHex(result[i].iv)
            )

        return result
    }

    export function setStudentInfo(FIO: string, birthDate: string, orderDorm: number, orderEnroll: number, enrollDate: string, birthPlace: string, address: string, roomId: number) {
        let iv = enc.createIV()
        let biv = iv.toString("hex")

        FIO = enc.encrypt(FIO, pass, undefined, iv)["enc"]
        birthDate = enc.encrypt(birthDate, pass, undefined, iv)["enc"]
        birthPlace = enc.encrypt(birthPlace, pass, undefined, iv)["enc"]
        address = enc.encrypt(address, pass, undefined, iv)["enc"]

        const sql = `INSERT INTO students (FIO, birthDate, orderDorm, orderEnroll, enrollDate, birthPlace, address, roomId, iv) VALUES("${FIO}", "${birthDate}", ${orderDorm}, ${orderEnroll}, "${enrollDate}", "${birthPlace}", "${address}", ${roomId}, "${biv}")`

        console.log(sql)
        db.run(sql)
    }

    export function addCorp(name: string, location: string) {
        const sql = `INSERT INTO corps (name, location) VALUES ("${name}", "${location}")`
        db.run(sql)
    }

    export function removeCorp(corpId: number) {
        const sql = `DELETE FROM corps WHERE corpId=${corpId}`
        db.run(sql)
    }

    export function addRoom(roomNumber: number, floor: number, corpId: number) {
        const sql = `INSERT INTO rooms (number, floor, corpId) VALUES (${roomNumber}, ${floor}, ${corpId})`
        db.run(sql)
    }

    export function removeRoom(roomId: number) {
        const sql = `DELETE FROM rooms WHERE roomId=${roomId}`
        db.run(sql)
    }
}

export default DB