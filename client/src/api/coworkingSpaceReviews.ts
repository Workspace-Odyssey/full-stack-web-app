import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 1000,
});

export interface reviewsObject {
    username: string,
    datePosted: string,
    reviewText?: string,
    rating: number,
}; 

export async function fetchReviewsByCoworkingSpaceId (endpoint: string) : Promise<Array<reviewsObject>> {
    try {
        const response = await instance.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error fetching coworking spaces data: ', error);
        throw error;
    }
}
