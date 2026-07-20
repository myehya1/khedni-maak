import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const sendMessage = async (message) => {
  const lower = message.toLowerCase();

  const isRideSearch =
    lower.includes('find') ||
    lower.includes('search') ||
    lower.includes('ride from') ||
    lower.includes('need a ride');

  const endpoint = isRideSearch ? '/ai/search-ride' : '/ai/chat';

  const response = await API.post(endpoint, { message });

  return response.data.reply;
};
