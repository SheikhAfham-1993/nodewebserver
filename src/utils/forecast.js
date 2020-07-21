const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=aeed9049fb7251308f5e6a9cf9f606e4&query=" + latitude + "," + longitude + "&units=m"

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Something went wrong', undefined)
        }
        else if (response.body.error) {
            callback('Parameters are not correct', undefined)
        }
        else {
            const { temperature, feelslike, weather_descriptions } = response.body.current
            const { name, country } = response.body.location
            callback(undefined, {
                name,
                country,
                temperature,
                feelslike,
                weather_descriptions,
                Return_value: `${weather_descriptions}, The temprature is currently ${temperature}°C but its feels like ${feelslike} °C`,
            })
        }
    })
}

module.exports = {
    forecast,
}