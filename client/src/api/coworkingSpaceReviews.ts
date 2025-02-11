import axios from 'axios';

// Create an Axios instance with base URL and timeout settings
const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 1000,
    withCredentials: true,
});

// Interface to define the structure of a review object
export interface reviewsObject {
    username: string,
    datePosted: string,
    reviewText?: string,
    rating: number,
}; 

// Function to fetch reviews for a specific coworking space by ID
export async function fetchReviewsByCoworkingSpaceId (endpoint: string) : Promise<Array<reviewsObject>> {
    try {
        const response = await instance.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error fetching coworking spaces data: ', error);
        throw error;
    }
}

// Function to submit a review for a specified coworking space
export async function submitReview (endpoint: string, review: reviewsObject) : Promise<any> {
    
    try {
        const response = await instance.post(endpoint, review);
        return response.data;
    } catch (error) {
        console.error('Error submitting review: ', error);
        throw error;
    }
}