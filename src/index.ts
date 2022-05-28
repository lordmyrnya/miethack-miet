import express from "express"

const app = express()

app.set('view engine', 'pug')

app.use('/contact', (request, response) => {
    response.render('contact', {
        title: 'Мои контактыыы',
        emailsVisible: true,
        emails: ['gavgav@mycorp.com', 'mioaw@mycorp.com'],
        phone: '+1234567890',
    })
})

app.use('/', (request, response) => {
    response.render('index')
})

app.use('/api', function (request, response) {

})

app.listen(3000)