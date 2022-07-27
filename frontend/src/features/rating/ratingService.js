import axios from 'axios';


const API_URL = '/api/ratings';


// Get Reviews for an app
const getReviewsByApp = async (appId) => {
    const res = await axios.get(`${API_URL}/app/${appId}`);
    return res.data;
}

// create a review
const createReview = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const res = await axios.post(`${API_URL}/review/`, data, config);
    return res.data;
}

// delete a review
const deleteReview = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const res = await axios.post(`${API_URL}/review/delete`, data, config);
    return res.data;
}


// Rate app
const rateApp = async (data, token) => {
    const conf = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    const response = await axios.post(`${API_URL}/rating/`, data, conf);
    return response.data;
}


// Delete rating
const deleteRating = async (data, token) => {
    const conf = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    const response = await axios.post(`${API_URL}/rating/delete`, data, conf);
    return response.data;
}


const ratingService = {
    getReviewsByApp,
    createReview,
    deleteReview,
    rateApp,
    deleteRating,
}

export default ratingService;