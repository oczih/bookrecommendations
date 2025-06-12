import axios from 'axios';

const API_URL = 'http://localhost:3000/api/people';

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
    const { data } = await axios.get(API_URL);
    return data;
}

const getById = async (id) => {
    const { data } = await axios.get(`${API_URL}/${id}`);
    return data;
}
const createPerson= async newObject => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(API_URL, newObject, config);
    return response.data;
}

const update = (id, newData) => {
  return axios.put(`${API_URL}/${id}`, newData).then(response => response.data);
};
export default {getAll
, getById, createPerson, update, setToken}