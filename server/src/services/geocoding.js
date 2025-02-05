const GEOCODING_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
const apiKey = process.env.GOOGLE_MAPS_API_KEY;
const axios = require('axios');

async function getGeocodingData(address) {
  
    try {
      const response = await axios.get(GEOCODING_API_URL, {
        params: { address, key: apiKey },
      });
  
      const results = response.data.results
  
      if (response.data.status === "OK" && results && results[0]) {
         return {"long": results[0].geometry.location.lng, "lat": results[0].geometry.location.lat}
      } else {
         console.error(
           "Error fetching coordinates from geocoding: " + response.data.status
         );
      }   
    } catch (error) {
      console.error('Error in geocoding service:', error);
      throw error;
    }
}

module.exports = { getGeocodingData };
  