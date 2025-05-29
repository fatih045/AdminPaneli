import axiosInstance from './baseService';

// API endpoints
const API_ENDPOINTS = {
  CARGO_AD: 'api/CargoAd',
  ACCEPT_CARGO_AD: 'api/Admin/AcceptCargoAd',
  REJECT_CARGO_AD: 'api/Admin/RejectCargoAd'
};

// Interface for Cargo Ad
export interface CargoAd {
  id: number;
  userId: string;
  customerName: string;
  title: string;
  description: string;
  dropCountry: string;
  dropCity: string;
  pickCountry: string;
  pickCity: string;
  currency: string;
  weight: number;
  cargoType: string;
  price: number;
  isExpired: boolean;
  admin1Id: string;
  admin2Id: string;
  status: string;
  createdDate: string;
  adDate: string;
}

// Interface for Accept/Reject Cargo Ad Request
export interface CargoAdActionRequest {
  cargoId: number;
  adminId: string;
}

// Get all cargo ads (with status query)
const getAllCargoAds = async (status: number = 0): Promise<CargoAd[]> => {
  const response = await axiosInstance.get(`${API_ENDPOINTS.CARGO_AD}?status=${status}`);
  return response.data;
};

// Get cargo ad by id
const getCargoAdById = async (id: number): Promise<CargoAd> => {
  const response = await axiosInstance.get(`${API_ENDPOINTS.CARGO_AD}/${id}`);
  return response.data;
};

// Delete cargo ad
const deleteCargoAd = async (id: number): Promise<void> => {
  await axiosInstance.delete(`${API_ENDPOINTS.CARGO_AD}/${id}`);
};

// Accept cargo ad
const acceptCargoAd = async (request: CargoAdActionRequest): Promise<void> => {
  await axiosInstance.post(API_ENDPOINTS.ACCEPT_CARGO_AD, request);
};

// Reject cargo ad
const rejectCargoAd = async (request: CargoAdActionRequest): Promise<void> => {
  await axiosInstance.post(API_ENDPOINTS.REJECT_CARGO_AD, request);
};

const cargoAdService = {
  getAllCargoAds,
  getCargoAdById,

  deleteCargoAd,
  acceptCargoAd,
  rejectCargoAd
};

export default cargoAdService;
