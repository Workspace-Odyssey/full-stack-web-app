const NEARBY_PLACES = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
const apiKey = process.env.GOOGLE_MAPS_API_KEY;
const axios = require('axios');

async function nearbySearch(coordinates, radius, keyword) {

  try {
    const response = await axios.get(NEARBY_PLACES, {
      params: { 
        key: apiKey,
        location: `${coordinates.lat},${coordinates.long}`,
        radius,
        keyword,
      },
    });

    const results = response.data.results

    if (response.data.status === "OK" && results.length) {
      const places = results.map(place => {
        return {
          "name": place.name,
          "address": place.vicinity,
          "coordinates": place.geometry.location,
        }
      });
      
      console.log(places);
      return places;
    } else {
       console.error(
         `No ${keyword} nearby` + response.data.status
       );
    }   
  } catch (error) {
    console.error(`Error fetching ${keyword}:`, error);
    throw error;
  }
}

module.exports = nearbySearch;
  