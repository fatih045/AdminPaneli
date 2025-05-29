import axios from 'axios';

// Base URL will need to be updated with your actual API endpoint
const API_URL = '/api/vehicle-ad-offers/';

// Get all vehicle ad offers
const getAllVehicleAdOffers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get vehicle ad offers by vehicle ad id
const getOffersByVehicleAdId = async (vehicleAdId: string) => {
  const response = await axios.get(`${API_URL}?vehicleAdId=${vehicleAdId}`);
  return response.data;
};

// Get vehicle ad offer by id
const getVehicleAdOfferById = async (id: string) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

// Create new vehicle ad offer
const createVehicleAdOffer = async (offerData: any) => {
  const response = await axios.post(API_URL, offerData);
  return response.data;
};

// Update vehicle ad offer
const updateVehicleAdOffer = async (id: string, offerData: any) => {
  const response = await axios.put(API_URL + id, offerData);
  return response.data;
};

// Delete vehicle ad offer
const deleteVehicleAdOffer = async (id: string) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

const vehicleAdOfferService = {
  getAllVehicleAdOffers,
  getOffersByVehicleAdId,
  getVehicleAdOfferById,
  createVehicleAdOffer,
  updateVehicleAdOffer,
  deleteVehicleAdOffer,
};

export default vehicleAdOfferService;
