import axios from 'axios';

// Base URL will need to be updated with your actual API endpoint
const API_URL = '/api/vehicle-ads/';

// Get all vehicle ads
const getAllVehicleAds = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get vehicle ad by id
const getVehicleAdById = async (id: string) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

// Create new vehicle ad
const createVehicleAd = async (vehicleAdData: any) => {
  const response = await axios.post(API_URL, vehicleAdData);
  return response.data;
};

// Update vehicle ad
const updateVehicleAd = async (id: string, vehicleAdData: any) => {
  const response = await axios.put(API_URL + id, vehicleAdData);
  return response.data;
};

// Delete vehicle ad
const deleteVehicleAd = async (id: string) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

const vehicleAdService = {
  getAllVehicleAds,
  getVehicleAdById,
  createVehicleAd,
  updateVehicleAd,
  deleteVehicleAd,
};

export default vehicleAdService;
