import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 3000,
});

async function fetchPhotoByPhotoReference (endpoint: string) : Promise<string> {
    
    try {
        const response = await instance.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error fetching photo: ', error);
        throw error;
    }
}

export default fetchPhotoByPhotoReference;