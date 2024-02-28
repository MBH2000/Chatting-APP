import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_REQ_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
});

export async function Search_controllers(user:any,data:any) {
    const term:Object={
        'name':data,
    }
    const config ={
        headers: {
            'Authorization':user.token,
        },
    };
    try {
        const response = await api.post('/search', term,config);
        return response.data; // If successful, return data
    } catch (error:any) {
        // If there's an error, handle it here
        if (error.response && error.response.data && error.response.data.message) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return { error: 'Error registering' }; // Return the error message
        } else {
            throw error; // Re-throw the error
        }
    }
}
