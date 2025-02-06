const nearbySearch = require('../util/nearbySearch')

async function getNearbyCoworkingSpaces (req, res) {
    const { location } = req.query;
    if (!location) {
        return res.status(400).json({ error: "Location query parameter is required" });
    }

	try {
		const listOfCoworkingSpaces = await nearbySearch(location);
		res.json(listOfCoworkingSpaces);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

module.exports = { getNearbyCoworkingSpaces };