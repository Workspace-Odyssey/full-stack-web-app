//has to be moved to the front-end to display the image properly

const PHOTO = 'https://maps.googleapis.com/maps/api/place/photo';
const apiKey = process.env.GOOGLE_MAPS_API_KEY;
const axios = require('axios');

async function getPhoto(photoReference) {

    try {
      const response = await axios.get(PHOTO, {
        params: { 
          key: apiKey,
          photo_reference: photoReference,
          maxheight: 1600,
          maxwidth: 1600,
        },
      });
  
      const results = response.data
        
      if (response.data.status === 'OK') {
        return results;
      } else {
         console.error(
           `No photo found` + response.data.status
         );
      }   
    } catch (error) {
      console.error(`Error fetching photo:`, error);
      throw error;
    }
  }

  module.exports = getPhoto;
