import axios from 'axios';
import { coworkingResultsObject } from '../components/App'

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 3000,
});

async function fetchNearbyCoworkingSpaces (endpoint: string) : Promise<Array<coworkingResultsObject>> {
    try {
        const response = await instance.get(endpoint);

        // Check if the response contains an array of coworking spaces
        if (Array.isArray(response.data)) {
            // Map through the array and extract only the necessary fields for each coworking space
            return response.data.map((coworking: any) => {
                return {
                    name: coworking.name,
                    nearestStation: coworking.nearestStationName,
                    stationDistance: coworking.distanceToStation,
                    rating: coworking.averageRating,
                    totalReviews: coworking.totalReviews,
                    photo: coworking.photo,
                    id: coworking.uuid,
                    address: coworking.address,
                };
            })
        }

        // Return an empty array if no coworking spaces were found
        return [];
    } catch (error) {
        console.error('Error fetching coworking spaces data: ', error);
        throw error;
    }
}

export default fetchNearbyCoworkingSpaces;