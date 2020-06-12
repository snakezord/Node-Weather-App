const request = require('postman-request');

const forecast = (body, callback) => {
    const accessKey = `d36a5c273f2a0bd9e535c78c5f723222`;
    const center = body.features[0].center;    
    const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${center.reverse().toString()}`;
    
    const options = { json: true };

    request(url, options, (err, res, body) => {
        if (err) callback('FORECAST: Couldn\'t make the API call.');
        
        else if (body.location.name === null) callback('FORECAST: Wrong Address.')
        
        else if (res.statusCode === 200) callback(body);
    });
}

module.exports = forecast;