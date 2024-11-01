
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const locationService = {
  async searchAddress(query) {
    const response = await api.get('/search-address', { params: { query } });
    return response.data;
  },

  async saveLocation(locationData) {
    const response = await api.post('/locations', locationData);
    return response.data;
  },

  async updateLocation(id, locationData) {
    const response = await api.put(`/locations/${id}`, locationData);
    return response.data;
  },

  async deleteLocation(id) {
    await api.delete(`/locations/${id}`);
  },

  async getAllLocations() {
    const response = await api.get('/locations');
    return response.data;
  }
};