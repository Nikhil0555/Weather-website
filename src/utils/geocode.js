const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibmlraGlsczA2IiwiYSI6ImNsMTgzNzJpajB2czQzaXMxa296cWF1djgifQ.QDzRfR624huJL72161VbbA&limit=1'
    request({ url , json: true }, (error, {body}) => {   // url is shorthand for url : url since names of key:value pair are same
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}



module.exports = geocode