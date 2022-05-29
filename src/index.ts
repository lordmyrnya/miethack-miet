import express from "express"
import bodyParser from "body-parser"
import api from "./api.js"
import 'dotenv/config'

const port = process.env.PORT || 3000
const app = express()

app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())

app.all('/api/:method', async (request, response) => {
    response.setHeader('Content-Type', 'text/plain')
    let data
    //переписать
    if(Object.keys(request.body).length>0) data = request.body
    else data = request.query
    console.log(request.body)
    response.send(await api(request.params.method, data))
})

app.use('/admin', async (request, response) => {
    let corps = await api("corps")
    response.render('main', {
        corpList: corps,
        admin: true
    })
})

app.use('/', async (request, response) => {
    let corps = await api("corps")
    response.render('main', {
        corpList: corps,
        admin: false
    })
})

app.listen(port)