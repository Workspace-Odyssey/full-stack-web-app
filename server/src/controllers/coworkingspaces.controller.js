const nearbySearch = require('../util/nearbySearch')
const getGeocodingData = require('../util/geocoding')

async function getNearbyCoworkingSpaces (req, res) {
    const { location } = req.query;
    if (!location) {
        return res.status(400).json({ error: 'Location query parameter is required' });
    }

	try {
        const coordinates = await getGeocodingData(location);
		const listOfCoworkingSpaces = await nearbySearch(coordinates, 500, 'coworking space');
		res.json(listOfCoworkingSpaces);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

async function getNearbyStation (req, res) {
    const { lat, long } = req.query;
    if (!lat && !long) {
        return res.status(400).json({ error: 'Latitude and longitude query parameters are required' });
    }

	try {
        const coordinates = { lat, long };
		const stations = await nearbySearch(coordinates, 10, 'station');
        console.log(stations)
		res.json(stations);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

module.exports = { getNearbyCoworkingSpaces, getNearbyStation };