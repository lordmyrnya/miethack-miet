import sqlite from 'sqlite-async'
const db = await sqlite.open('./db/students.db')
namespace DB {
    export async function getCorps() {
        // const sql = 'SELECT corpId,MAX(floor) FROM corps INNER JOIN rooms ON corps.corpId=rooms.corpId'
        const sql = 'SELECT * FROM corps'
        const result = await db.all(sql)
        return result
    }
}

export default DB