import axios from 'axios';


const API_URL = '/api/apps';


// @route   GET api/apps?area=str&state=str&occCode=str&sort=int&offset=int
// @desc    Get Apps
// @access  Public
const getApps = async (data) => {
    
}


const profileService = {
    getApps,
}

export default profileService;