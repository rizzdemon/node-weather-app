const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather 🏠',
        name: 'Tristan Ponder'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: '😀😀😀😀😀😀😀',
        name: 'N̴̨̧̗͉̘͔̜͇̠͕̼͔̞͓̠̱̫̲̺̻̞͕̘̗͈̹͎̏͑̏̌̂͐͊͗̃̒̐̅̃͒̔̋͐̚͜͜͝I̷̧̢̨̲͍̣͚̯̤̮̖͙̜͔̝̬̘̳̼̬̘̹̻̫̬̝̟͙͚̻̮̺̼̭̦͉̦͚̳̝̬͈̯̹̳̮̰͇̎̓͜ͅG̵̳͍̲̣̣̞̻̱̱͋̂̌̑̃̽̋̉̀̓̿̒̑̑̓̚͝͠ͅH̸̢̤͉̜̗̯͚͓͕̞̳̰͉͚̞̠̪̫͑͆̉̈̾̿̂̈́̀̓̀̔̒̎̓͐̃͆͘̚̕T̷̨̨̢̛̼̜̯͔̥͍̮̜̬͚̘̞̱̖̻̺̪̥̠͉̲͓̤͉̺̫̔̔̓̇̃̔͂̇̀̄̑͌̕M̶̛̤̝̗̖̓̆̊͐̄͋͂͂̓̾͛̓̋̚Ą̶̰̹̼͎͖̘͖͚̗̳͙͎̤̰̯̬̏͊̀̀̔ͅͅR̴̡̞͓̤̥͈̲̤̉̚̚Ë̸̻̼͍̪̤̯́̓̌͗͊̋̎͋͑̂̃̋͋͐̇͐͊́́̈̒̀͒͗̉̆͒̃̓̓̒́͑͆̒̃̃̇̽̓͂̋̃͜͠'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'If the location you want is not showing up, Try inserting a more specific location.',
        title: 'Help ❓',
        name: 'Tristan Ponder'
    })
})

app.get('/airports', (req, res) => {
res.render('airports',{
    epictext: 'testing',
    title: 'test',
    name: '123 test'
})
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address! 🤔'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tristan Ponder',
        errorMessage: 'Help article not found. ❓'
    })
})  

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tristan Ponder',
        errorMessage: 'Page not found. ❓'
    })
})

app.listen(port, () => {
    console.log('Server is up and running on port ' + port + '!')
})