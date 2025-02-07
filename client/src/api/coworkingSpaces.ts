import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 1000,
});

interface coworkingResultsObject {
    photo?: string,
    name: string,
    rating?: number,
    totalReviews?: number,
    station?: string,
    stationDistance?: number
};

async function fetchNearbyCoworkingSpaces (endpoint: string) : Promise<Array<coworkingResultsObject>> {
    try {
        const response = await instance.get(endpoint);
        if (Array.isArray(response.data)) {
            return response.data.map((coworking: any) => ({
                name: coworking.name,
            }))
        }
        return [];
    } catch (error) {
        console.error('Error fetching data: ', error);
        throw error;
    }
}

export default fetchNearbyCoworkingSpaces;