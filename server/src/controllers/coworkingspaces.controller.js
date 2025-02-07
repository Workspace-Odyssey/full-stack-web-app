const nearbySearch = require('../util/nearbySearch')
const getGeocodingData = require('../util/geocoding')
const getDistance = require('../util/distance')
const asyncHandler = require("express-async-handler");
const Coworking = require('../models/coworkingModels');
const Reviews = require('../models/reviews.model');


const registerCoworking = asyncHandler(async (req, res) => {
    const coworkingSpace = req.body;

    if(!coworkingSpace.name || !coworkingSpace.location) {
        res.status(400);
        throw new Error('Fill out all the fields');
    }

    // Check if coworking exist
    const coworkingExist = await Coworking.findOne(coworkingSpace.name);
    if (coworkingExist) {
        res.status(400);
        throw new Error('Coworking already exists');
    }

    // Create new coworking profile
    const newCoworking = await Coworking.create(coworkingSpace);

    if (newCoworking) {
        res.status(201).json({
            message: 'Coworking space registered successfully'
        });
    } else {
        res.status(400);
        throw new Error('Invalid data')
    }
})

async function getNearbyCoworkingSpaces (req, res) {
    const { location } = req.query;
    if (!location) {
        return res.status(400).json({ error: 'Location query parameter is required' });
    }

	try {
        const coordinates = await getGeocodingData(location);
		const listOfCoworkingSpaces = await nearbySearch(coordinates, 'coworking space');

        const promiseArrayOfCoworkingSpaces = await listOfCoworkingSpaces.map(async (coworkingSpace) => {
            const nearbyStations = await nearbySearch(coworkingSpace.coordinates, 'train_station|subway_station');
            const nearestStation = nearbyStations[0]
            const nearestStationCoordinates = nearestStation.coordinates;
            const nearestStationName = nearestStation.name
            
            const distance = await getDistance(coworkingSpace.coordinates, nearestStationCoordinates);

            const coworkingSpaceID = await Coworking.findByGooglePlaceID(coworkingSpace.placeID);

            if (coworkingSpaceID) {
                const stars = await Reviews.getAverageRatingByCoWorkingId(coworkingSpaceID.uuid);
                const numOfRatings = await Reviews.getNumberOfRatingsByCoWorkingId(coworkingSpaceID.uuid);
                return { ...coworkingSpace, nearestStationName, distance, stars, numOfRatings}
            }

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