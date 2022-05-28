import express from "express"
import bodyParser from "body-parser"
import api from "./api.js"

const port = process.env.PORT || 3000;
const app = express()

app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use('/contact', (request, response) => {
    response.render('contact', {
        title: 'Мои контактыыы',
        emailsVisible: true,
        emails: ['gavgav@mycorp.com', 'mioaw@mycorp.com'],
        phone: '+1234567890',
    })
})

app.use('/api', (request, response) => {
    response.setHeader('Content-Type', 'text/plain')
    let data
    if(request.query) data = request.query
    else data = request.body
    console.log(data)
    response.send(api.defaultAction(data))
})

app.use('/', (request, response) => {
    response.render('index')
})



app.listen(port)