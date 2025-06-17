const axios = require('axios');

const API = axios.create({
        baseURL: 'projeto-gt-10-back-end.vercel.app'
    })
 
export default API;