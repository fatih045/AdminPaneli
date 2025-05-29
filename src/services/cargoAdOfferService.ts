import axios from 'axios';

// Base URL will need to be updated with your actual API endpoint
const API_URL = '/api/cargo-ad-offers/';

// Get all cargo ad offers
const getAllCargoAdOffers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get cargo ad offers by cargo ad id
const getOffersByCargoAdId = async (cargoAdId: string) => {
  const response = await axios.get(`${API_URL}?cargoAdId=${cargoAdId}`);
  return response.data;
};

// Get cargo ad offer by id
const getCargoAdOfferById = async (id: string) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

// Create new cargo ad offer
const createCargoAdOffer = async (offerData: any) => {
  const response = await axios.post(API_URL, offerData);
  return response.data;
};

// Update cargo ad offer
const updateCargoAdOffer = async (id: string, offerData: any) => {
  const response = await axios.put(API_URL + id, offerData);
  return response.data;
};

// Delete cargo ad offer
const deleteCargoAdOffer = async (id: string) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

const cargoAdOfferService = {
  getAllCargoAdOffers,
  getOffersByCargoAdId,
  getCargoAdOfferById,
  createCargoAdOffer,
  updateCargoAdOffer,
  deleteCargoAdOffer,
};

export default cargoAdOfferService;
