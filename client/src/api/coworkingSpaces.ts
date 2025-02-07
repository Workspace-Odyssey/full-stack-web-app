import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 5000,
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
        if (Array.isArray(response.data)) {
            return response.data.map((coworking: any) => {
                console.log(coworking)
                const coworkingSpace = {
                    name: coworking.name,
                    station: coworking.nearestStationName,
                    stationDistance: coworking.distance,
                }
                return coworkingSpace;
            })
        }
        return [];
    } catch (error) {
        console.error('Error fetching data: ', error);
        throw error;
    }
}

export default fetchNearbyCoworkingSpaces;