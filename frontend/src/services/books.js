import axios from 'axios';

const API_URL = 'http://localhost:3000/api/books';

const getAll = async () => {
    const { data } = await axios.get(API_URL);
    return data;
}

const getById = async (id) => {
    const { data } = await axios.get(`${API_URL}/${id}`);
    return data;
}
const createBook = async newObject => {
    const response = await axios.post(API_URL, newObject);
    return response.data;
}
export default {getAll
, getById, createBook}