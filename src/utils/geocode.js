const request = require('postman-request');

const geocode = (address, callback) => {
    const accessToken = `pk.eyJ1IjoiMi1jb21tYS1jbHViIiwiYSI6ImNrYWk4YW1xZjBubXkyc295YTUwc3N5dnEifQ.aAg07OOU135yBzlmn4Acww`;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${accessToken}&limit=1`;

    const options = { json: true };

    request(url, options, (err, res, body) => {
        if (err) callback('GEOCODE: Couldn\'t make the API call.', true);
        
        else if (body.features.length === 0) callback('GEOCODE: Wrong Address.', true)

        else if (res.statusCode === 200) callback(body, false);         
    });
}

module.exports = geocode;