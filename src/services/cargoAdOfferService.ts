import axiosInstance from './baseService';

// API endpoints
const API_ENDPOINTS = {
  CARGO_OFFER: 'api/CargoOffer',
  ACCEPT_CARGO_OFFER: 'api/Admin/AcceptCargoOffer',
  REJECT_CARGO_OFFER: 'api/Admin/RejectCargoOffer',
};

// Interface for Cargo Offer
export interface CargoOffer {
  id: number;
  senderId: string;
  receiverId: string;
  cargoAdId: number;
  cargoAdTitle: string;
  price: number;
  message: string;
  status: string;
  admin1Id: string;
  admin2Id: string;
  adminStatus: string;
  expiryDate: string;
  createdDate: string;
}

// Interface for Accept/Reject Cargo Offer Request
export interface CargoOfferActionRequest {
  id: number;
  adminId: string;
}

// Get all cargo offers
const getAllCargoOffers = async (): Promise<CargoOffer[]> => {
  const response = await axiosInstance.get(API_ENDPOINTS.CARGO_OFFER);
  return response.data;
};

// Accept cargo offer
const acceptCargoOffer = async (request: CargoOfferActionRequest): Promise<void> => {
  await axiosInstance.post(API_ENDPOINTS.ACCEPT_CARGO_OFFER, request);
};

// Reject cargo offer
const rejectCargoOffer = async (request: CargoOfferActionRequest): Promise<void> => {
  await axiosInstance.post(API_ENDPOINTS.REJECT_CARGO_OFFER, request);
};

const cargoAdOfferService = {
  getAllCargoOffers,
  acceptCargoOffer,
  rejectCargoOffer,
};

export default cargoAdOfferService;
