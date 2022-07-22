import axios from "axios";


const API_URL = "/api/developers";


// get me
const getMe = async (token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const res = await axios.get(`${API_URL}/me`, config);
    return res.data;
}


// get developer by id
const getDeveloper = async (id) => {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
}


// create developer
const createDeveloper = async (data, token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    const res = await axios.post(`${API_URL}`, data, config);
    return res.data;
}


// update developer
const updateDeveloper = async (data, token) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    const res = await axios.put(`${API_URL}`, data, config);
    return res.data;
}



const developerService = {
    getMe,
    getDeveloper,
    createDeveloper,
    updateDeveloper,
}


export default developerService;