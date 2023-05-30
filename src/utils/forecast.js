const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=74b0b17ce9a9449c6b40c078142d61f0&query=' + latitude + ',' + longitude

    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('no wifi lmao', undefined)
        } else if (body.error) {
            callback('idk what that location is', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently 🌡" + body.current.temperature + " degress out.")
        }
    })
}

module.exports = forecast
