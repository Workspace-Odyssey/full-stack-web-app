const DIRECTIONS = 'https://maps.googleapis.com/maps/api/directions/json';
const apiKey = process.env.GOOGLE_MAPS_API_KEY;
const axios = require('axios');

async function getDistance(origin, destination) {

  try {
    const response = await axios.get(DIRECTIONS, {
      params: { 
        key: apiKey,
        origin: `${origin.lat},${origin.long}`,
        destination: `${destination.lat.toString()},${destination.long.toString()}`,
        mode: 'walking',
        units: 'metric',
      },
    });

    const results = response.data.routes

    if (response.data.status === 'OK' && results) {

        const distance = results[0].legs[0].distance.value
        return distance;
    } else {
       console.error(
         `No routes found` + response.data.status
       );
    }   
  } catch (error) {
    console.error(`Error fetching routes:`, error);
    throw error;
  }
}

module.exports = getDistance;
  