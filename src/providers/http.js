import axios from 'axios';

export default() => {
  return axios.create({
    baseURL: 'https://ig4h9ptkk0.execute-api.us-east-1.amazonaws.com/dev/',
    withCredentials: false,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
};
