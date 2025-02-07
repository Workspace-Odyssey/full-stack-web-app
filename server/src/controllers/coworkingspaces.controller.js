const nearbySearch = require('../util/nearbySearch')
const getGeocodingData = require('../util/geocoding')
const getDistance = require('../util/distance')
const asyncHandler = require("express-async-handler");
const Coworking = require('../models/coworkingModels');


const registerCoworking = asyncHandler(async (req, res) => {
    const {name, location} = req.body

    if(!name || !location) {
        res.status(400);
        throw new Error('Fill out all the fields')
    }
    // Check if coworking exist
    const coworkingExist = await Coworking.findOne({ name });
    if(coworkingExist) {
        res.status(400);
        throw new Error('Coworking already exists');
    }
    
    // Create new coworking profile
    const [newCoworking] = await Coworking.create({
        name,
        location,
    }, ["name", "location"])

    if(newCoworking) {

        res.status(201).json({
            message: 'Coworking registered successfully'
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data')
    }
})

async function getNearbyCoworkingSpaces (req, res) {
    const { location } = req.query;
    if (!location) {
        return res.status(400).json({ error: 'Location query parameter is required' });
    }

	try {
        const coordinates = await getGeocodingData(location);
		const listOfCoworkingSpaces = await nearbySearch(coordinates, 500, 'coworking space');

        const promiseArrayOfCoworkingSpaces = await listOfCoworkingSpaces.map(async (coworkingSpace) => {
            const nearbyStations = await nearbySearch(coworkingSpace.coordinates, 10, 'train_station|subway_station');
            const nearestStation = nearbyStations[0]
            const nearestStationCoordinates = nearestStation.coordinates;
            const nearestStationName = nearestStation.name
            const distance = await getDistance(coworkingSpace.coordinates, nearestStationCoordinates);
            console.log( { ...coworkingSpace, nearestStationName, distance} )
            return { ...coworkingSpace, nearestStationName, distance}
        })

        Promise.all(promiseArrayOfCoworkingSpaces)
            .then((array) => res.json(array))
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

//*********/

// async function displayPhoto (req, res) {
//     const { reference } = req.query;
//     if (!reference) {
//         return res.status(400).json({ error: 'Photo reference query parameter is required' });
//     }

// 	try {
//         const photo = await getPhoto(reference)
//         res.send(photo)

// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// }

module.exports = { getNearbyCoworkingSpaces, registerCoworking};