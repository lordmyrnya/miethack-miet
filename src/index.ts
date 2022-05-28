import express from "express"
import bodyParser from "body-parser"
import api from "./api.js"

const port = process.env.PORT || 3000;
const app = express()

app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())

app.use('/contact', (request, response) => {
    response.render('contact', {
        title: 'Мои контактыыы',
        emailsVisible: true,
        emails: ['gavgav@mycorp.com', 'mioaw@mycorp.com'],
        phone: '+1234567890',
    })
})

app.use('/api/:method', async (request, response) => {
    response.setHeader('Content-Type', 'text/plain')
    let data
    //переписать
    data = request.query || request.body
    response.send(await api(request.params.method, data))
})

app.use('/', (request, response) => {
    response.render('index')
})



app.listen(port)