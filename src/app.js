const path = require('path')
const express = require('express');
const hbs = require('hbs');
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast');



const app = express()
const port = process.env.PORT || 3000   // if the port from heroku doesnt work, we have set default or OR value as 3000, so the server will run on port 3000

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'))   // This is how we get to know the path of the public folder. by combining the original directory path with the folder using path.join which is a function of path in npm module

// Define paths for express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars and views location
app.set('view engine' , 'hbs') // this is used to setup handlebars. 
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath)) 

app.get('', (req , res)=>{
    res.render('index',{

        title : "Weather App",
        pname : "Nikhil Sharma"
    })                       // First arg is for name of the view to render and second arg is object

 })

 app.get('/about', (req , res )=>{
     res.render('about',{

        title : "About",
        pname : "Nikhil Sharma" 
     })
 })

app.get('/help', (req , res)=>{

    res.render('help',{
        title : 'HELP !!',
        paragraph : 'This page is for people who needs any help with the web',
        pname : 'Nikhil Sharma'
    })
})

app.get('/weather',(req , res)=>{
   if(!req.query.address){
      return res.send({
           error : "Please provide the address"
       })
   }

   geocode(req.query.address, (error, {latitude, longitude, location}={})=>{ // We have used {} to assign default null values to latitude, longitude ad location ,destructuring

    if(error){
      return res.send({
            error : "Please Provide a location"
        })
    }
    forecast(latitude, longitude, (error, forecastData)=>{
        if(error){
           return res.send({ error })
        }
        
        res.send({
            forecast : forecastData, 
            location : location,
            address : req.query.address
        })
    })
   })
})


// app.get('/product', (req, res)=>{
//    if(!req.query.search){
//        return res.send({
//            error : "You must provide a search term"
//        })
//    }

//    console.log(req.query.search)
//    res.send({
//        products : []                         // An example 
//    })
// })

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title : "404",
        errorMessage : "Help Article not Found",
        pname : "Nikhil Sharma"

    })
})



app.get('*', (req, res)=>{
    res.render('404',{
        title : "404",
        errorMessage : "Page Not Found",
        pname : "Nikhil Sharma"
    })
})
app.listen(port, ()=>{
    console.log("server is up on port" + port)
})


