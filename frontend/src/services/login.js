import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
const API_URL = `${API_BASE_URL}/api/login`;


const login = async credits => {
    const response = await axios.post(API_URL, credits)
    return response.data
}

const register = async credits => {
    console.log(credits)
    const response = await axios.post(`${API_URL}/register`, credits)
    return response.data
}
const get = async (id) => {
    const { data } = await axios.get(`${API_URL}/${id}`);
    return data;
}
const update = async (credits, id) => {
    const response = await axios.put(`${API_URL}/${id}`, credits)
    return response.data
}



export default {login, register, get, update}