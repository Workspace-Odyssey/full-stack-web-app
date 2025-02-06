const NEARBY_PLACES = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
const apiKey = process.env.GOOGLE_MAPS_API_KEY;
const axios = require('axios');
const getGeocodingData = require('./geocoding')

async function nearbySearch(address, keyword) {

  const coordinates = await getGeocodingData(address);

  try {
    const response = await axios.get(NEARBY_PLACES, {
      params: { 
        key: apiKey,
        location: `${coordinates.lat},${coordinates.long}`,
        radius: 500,
        keyword,
      },
    });

    const results = response.data.results

    if (response.data.status === "OK" && results.length) {
      const coworkingSpaces = results.map(place => {
        return {
          "name": place.name,
          "address": place.vicinity,
          "coordinates": place.geometry.location,
        }
      });
      
      console.log(coworkingSpaces);
      return coworkingSpaces;
    } else {
       console.error(
         "No co-working spaces nearby: " + response.data.status
       );
    }   
  } catch (error) {
    console.error('Error fetching co-working spaces:', error);
    throw error;
  }
}

module.exports = nearbySearch;
  