import axios from "axios";


const API_BASE_URL = import.meta.env.VITE_APP_REQ_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
});




export async function Register_controllers(data:any) {
    
    try {
        const response = await api.post('/register', data);
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
export async function Login_controllers(data:any) {
    try {
        const response = await api.post('/login', data);
        return response.data; // If successful, return data
    } catch (error:any) {
        if (error.response && error.response.data && error.response.data.message) {
            return { error: 'Error registering' }; 
        } else {
            throw error; 
        }
    }
}

export async function Logout_controllers(data:any) {
    const config ={
        headers: {
            'Authorization':data.token,
        },
    };
    try {
        const response = await api.post('/logout',{},config);
        return response.data; // If successful, return data
    } catch (error:any) {
        if (error.response && error.response.data && error.response.data.message) {
            return { error: 'Error ' };
        } else {
            throw error; 
        }
    }
}

export async function Profile_controllers(data:any) {
    const config ={
        headers: {
            'Authorization':data.token,
        },
    };
    try {
        const response = await api.post('/profile',{},config);
        return response.data; // If successful, return data
    } catch (error:any) {
        if (error.response && error.response.data && error.response.data.message) {
            return { error: 'Error ' };
        } else {
            throw error; 
        }
    }
}

export async function Profile_Edit_controllers(token:any,data:any) {
    const config ={
        headers: {
            'Authorization':token.token,
        },
    };
    try {
        const response = await api.post('/edit',data,config);
        return response.data; // If successful, return data
    } catch (error:any) {
        if (error.response && error.response.data && error.response.data.message) {
            return { error: 'Error ' };
        } else {
            throw error; 
        }
    }
}