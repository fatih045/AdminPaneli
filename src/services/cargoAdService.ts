import axios from 'axios';

// Base URL will need to be updated with your actual API endpoint
const API_URL = '/api/cargo-ads/';

// Get all cargo ads
const getAllCargoAds = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get cargo ad by id
const getCargoAdById = async (id: string) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

// Create new cargo ad
const createCargoAd = async (cargoAdData: any) => {
  const response = await axios.post(API_URL, cargoAdData);
  return response.data;
};

// Update cargo ad
const updateCargoAd = async (id: string, cargoAdData: any) => {
  const response = await axios.put(API_URL + id, cargoAdData);
  return response.data;
};

// Delete cargo ad
const deleteCargoAd = async (id: string) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

const cargoAdService = {
  getAllCargoAds,
  getCargoAdById,
  createCargoAd,
  updateCargoAd,
  deleteCargoAd,
};

export default cargoAdService;
