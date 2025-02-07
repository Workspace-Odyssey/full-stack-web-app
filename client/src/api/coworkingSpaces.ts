import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 3000,
});

interface coworkingResultsObject {
    photo?: string,
    name: string,
    rating?: number,
    totalReviews?: number,
    station: string,
    stationDistance: number
};

async function fetchNearbyCoworkingSpaces (endpoint: string) : Promise<Array<coworkingResultsObject>> {
    try {
        const response = await instance.get(endpoint);

        // Check if the response contains an array of coworking spaces
        if (Array.isArray(response.data)) {
            return response.data.map((coworking: any) => {

                return {
                    name: coworking.name,
                    station: coworking.nearestStationName,
                    stationDistance: coworking.distanceToStation,
                    rating: coworking.averageRating,
                    totalReviews: coworking.totalReviews,
                    photo: coworking.photo,
                };
            })
        }
        return [];
    } catch (error) {
        console.error('Error fetching coworking spaces data: ', error);
        throw error;
    }
}

export default fetchNearbyCoworkingSpaces;