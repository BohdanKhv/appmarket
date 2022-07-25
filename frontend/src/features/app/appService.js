import axios from 'axios';


const API_URL = '/api/apps';


// get all apps created by logged in user
const getMe = async (token) => {
    const conf = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    const response = await axios.get(`${API_URL}/developer/me`, conf);
    return response.data;
}

// get app by domain name
const getApp = async (domain) => {
    const response = await axios.get(`${API_URL}/${domain}`);
    return response.data;
}

// get apps by developer id
const getDeveloperApps = async (id) => {
    const response = await axios.get(`${API_URL}/developer/${id}`);
    return response.data;
}

// get apps by category
const getAppsByCategory = async (data) => {
    const response = await axios.get(`${API_URL}/category/${data.category}?limit=${data.limit}&offset=${data.offset}`);
    return response.data;
}

// get apps by search
const getAppsBySearch = async (data) => {
    const response = await axios.get(`${API_URL}/search/${data.query}?limit=${data.limit}&offset=${data.offset}`);
    return response.data;
}

// create app
const createApp = async (data, token) => {
    const conf = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    const response = await axios.post(`${API_URL}`, data, conf);
    return response.data;
}

// update app's meta
const updateAppMeta = async (domain, token) => {
    const conf = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    const response = await axios.get(`${API_URL}/meta/${domain}`, conf);
    return response.data;
}


// update app
const updateApp = async (data, token) => {
    const conf = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    const response = await axios.put(`${API_URL}/${data.id}`, data, conf);
    return response.data;
}


// delete app
const deleteApp = async (domain, token) => {
    const conf = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    const response = await axios.delete(`${API_URL}/app/${domain}`, conf);
    return response.data;
}


const profileService = {
    getMe,
    getApp,
    getDeveloperApps,
    getAppsByCategory,
    getAppsBySearch,
    createApp,
    updateAppMeta,
    updateApp,
    deleteApp
}

export default profileService;