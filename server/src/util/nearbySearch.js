const NEARBY_PLACES_API_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
const apiKey = process.env.GOOGLE_MAPS_API_KEY;
const axios = require('axios');

async function nearbySearch(coordinates, keyword) {

  try {
    const response = await axios.get(NEARBY_PLACES_API_URL, {
      params: { 
        key: apiKey,
        location: `${coordinates.lat},${coordinates.long}`,
        keyword,
        rankby: 'distance',
      },
    });

    const results = response.data.results

    console.log(results)

    if (response.data.status === 'OK' && results.length) {
      const places = results.map(place => {

        return {
          'name': place.name,
          'address': place.vicinity,
          'placeID': place.place_id,
          'coordinates': { 
            'lat': place.geometry.location.lat,
            'long': place.geometry.location.lng,
          },
          'photo': place.photos && place.photos.length > 0
            ? place.photos[0].photo_reference : undefined,
        }
      });
      
      return places;
    } else {
      console.error(`No ${keyword}s found nearby: ${response.data.status}`);
    }   
  } catch (error) {
    console.error(`Error fetching nearby ${keyword}:`, error);
    throw error;
  }
}

module.exports = nearbySearch;
  