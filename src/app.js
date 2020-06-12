const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Define paths for Express configs
const publicDir = path.join(__dirname, "../public")
const viewsDir = path.join(__dirname, "../templates/views")
const partialsDir = path.join(__dirname, "../templates/partials") 

const app = express()

/* Setup Handlebars engine and views location */
app.set('view engine', 'hbs') // template rendering engine Handlebars
app.set('views', viewsDir) // views is the default directory
hbs.registerPartials(partialsDir) // Partials make it really easy to render same same thing over and over again


/* MIDDLEWARE
 * We will be able to view 
 * what every file is requested
 * from publicDir in the browser
 * if a file is located outside
 * of this directory, 404 will be
 * returned 
 */
// Setup static directory to serve
//We use this
app.use(express.static(publicDir))
//Instead of this
/* app.get('', (req, res) => {
    res.send('some html')
}); */

app.get('', (req, res) => {  
    res.render('index', {
        title: 'Weather App',
        name: 'Roman Walls'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'I would bang her so hard',
        name: 'Roman Walls'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Helping message',
        title: 'Help', 
        name: 'Roman Walls'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) return res.send({ error: 'Your must provide an address term'})
    geocode(req.query.address, (data, err) => {
        if(err) return res.send({error: data})
        
        forecast(data, ({current} = {}) => {
            res.send({
                forecast: `${current.temperature}°C, Wind ${current.wind_dir} at ${current.wind_speed} Km/h, ${current.humidity}% Humidity`,
                address: data.features[0].place_name
            })
        })                         
    })
});

app.get('/products', (req, res) => {
    if(!req.query.search) return res.send({error: 'Your must provide a search term'})

    res.send({
        products: []
    })
});

app.get('/help/*', (req, res) => {
    res.render("404", {
        title: "404 Help article not found"
    })
})

// Match anythin g that hasn't been matched before
app.get('*', (req, res) => { // Must be last!
    res.render('404', {
        title: '404 page not found Amigo',
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});

 

