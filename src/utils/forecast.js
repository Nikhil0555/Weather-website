const request= require('request')

const forecast= (longitude,latitude, callback)=>{
    const url = 'http://api.weatherstack.com//current?access_key=78637866e43d3d527761097e9e6cfca3&query='+ latitude +','+ longitude +''

    request({url , json: true},(error,{body}) =>{
        if(error){
            callback("Unable to connect !", undefined)
        }
        else if(body.error){
            callback("Unable to connect to weather service", undefined)
        }
        else{
            callback(undefined, body.current.weather_descriptions[0]+ ', It is currently ' + body.current.temperature + ' degrees celsius out. There is ' + body.current.precip + '% chance of rain.\n Humidity ='+ body.current.humidity) 
        }
    
    })
}

module.exports= forecast