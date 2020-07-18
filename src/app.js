// Core Modules
const path = require('path')

// NPM Modules
const express = require('express')
const hbs = require('hbs')

// Custom NodeJS Files
const forecast = require('./utils/forecast')
const geoCode = require('./utils/geoLocation')

// Express application initialization
const app = express()

// Setting up directory path
const publicdirectorypath = path.join(__dirname, '../public')
const viewDirectory = path.join(__dirname, '../templates/views')
const partialDirectory = path.join(__dirname, '../templates/partial')

// Setting up handlebars as viewengine to control dynamic templating
app.set('view engine', 'hbs')
app.set('views', viewDirectory)
hbs.registerPartials(partialDirectory)

// setting static directory for static pages
app.use(express.static(publicdirectorypath)) // this path will be served as public path so that we access images and styling using absolute path method

// Here app.get for getting request from requester and returns the content back to requester
app.get('', (req, res) => {
    // In res.render, we dont need to give full path, just name should be same. It will automatically goes to views folder
    res.render('index', {
        title: 'Weather App',
        name: 'Sheikh Afham',
    })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about page of the App',
        name: 'Sheikh Afham',
    })

})

app.get('/help', (req, res) => {
    res.render('help', {
        helptitle: 'help page of webserver',
        title: 'help page of the App',
        name: 'Sheikh Afham',
    })
})


// app.get('/weather', (req, res) => {
//     const user_arg = process.argv.slice(2)[0]
//     get_cityForecast_geo(user_arg, (error, response) => {
//         if (error) {
//             return console.log('Error', error)
//         }
//         res.send(response)
//     })

// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send(
            {
                error: 'No Query string is defined'
            }
        )
    }

    get_cityForecast_geo(req.query.address, (error, response) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        res.send(response)
    })
})

app.get('/help/*', (req, res) => {
    res.render('pnf', {
        title: '404',
        contentnotfound: 'Help article not found',
        name: 'Sheikh Afham Uddin'

    })
})

app.get('*', (req, res) => {
    res.render('pnf', {
        title: '404',
        contentnotfound: 'Page not found',
        name: 'Sheikh Afham Uddin'

    })
})

// general method to get forecast
const get_cityForecast_geo = (userarg, callback) => {
    geoCode.geoCode(userarg, (error, { longitude, latitude } = {}) => {
        if (error) {
            return callback(error, undefined)
        }

        forecast.forecast(longitude, latitude, (error, { name, country, temperature, feelslike, weather_descriptions, Return_value }) => {
            if (error) {
                return callback(error, undefined)
            }

            callback(undefined, {
                name,
                country,
                latitude,
                longitude,
                temperature,
                feelslike,
                weather_descriptions,
                Return_value,
            })
        })
    })
}

// app.listen is responsible for starting the server
// it is an asynchronous process

app.listen(3000, () => {
    console.log('Server is up and running')
})