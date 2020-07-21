const request = require('request')
const geoCode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1Ijoic2hlaWtoMTk5MyIsImEiOiJja2NqNWMxbnAxaW4wMnlubjB4OTh4cGM2In0.t6PVe7ukNokytSNHnTmc3w&limit=1"
    request({ url: url, json: true }, (error, response) => {
        console.log(response)
        if (error) {
            callback('Something is wrong with the connection', undefined)
        }
        else if (response.body.features.length === 0) {
            callback('Unable to search the address, please use different address', undefined)
        }
        else {
            const { center, place_name } = response.body.features[0]
            const [longitude, latitude] = center
            callback(undefined, {
                latitude: latitude,
                longitude: longitude,
                place: place_name,
            })
        }
    })
}

module.exports =
{
    geoCode,
}
