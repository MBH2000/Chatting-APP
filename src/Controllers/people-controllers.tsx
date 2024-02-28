import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_REQ_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
});

export async function Get_Info(data:any) {
    const term:Object={
        '_id':data,
    }
    try {
        const response = await api.post('/info', term);
        return response.data; // If successful, return data
    } catch (error:any) {

        if (error.response && error.response.data && error.response.data.message) {
            return { error: 'Error registering' };
        } else {
            throw error;
        }
    }
}

export async function Add_Friend(user:any,data:any) {
    const config ={
        headers: {
            'Authorization':user.token,
        },
    };
    try {
        const response = await api.post('/add', data,config);
        return response.data;
    } catch (error:any) {
        if (error.response && error.response.data && error.response.data.message) {
            return { error: 'Error registering' }; 
        } else {
            throw error; 
        }
    }
}

export async function Remove_Friend(user:any,data:any) {
    const config ={
        headers: {
            'Authorization':user.token,
        },
    };
    try {
        const response = await api.post('/remove', data,config);
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