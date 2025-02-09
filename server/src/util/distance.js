const DIRECTIONS_API_URL = 'https://maps.googleapis.com/maps/api/directions/json';
const apiKey = process.env.GOOGLE_MAPS_API_KEY;
const axios = require('axios');

async function getWalkingDistance(startCoordinates, endCoordinates) {

  try {
    const response = await axios.get(DIRECTIONS_API_URL, {
      params: { 
        key: apiKey,
        origin: `${startCoordinates.lat},${startCoordinates.long}`,
        destination: `${endCoordinates.lat.toString()},${endCoordinates.long.toString()}`,
        mode: 'walking',
        units: 'metric',
      },
    });

    const results = response.data.routes

    if (response.data.status === 'OK' && results) {
        const walkingDistance = results[0].legs[0].distance.value
        return walkingDistance;
    } else {
       console.error(`No routes found. Status: ${response.data.status}`);
    }   
  } catch (error) {
    console.error(`Error fetching routes:`, error);
    throw error;
  }
}

module.exports = getWalkingDistance;
  