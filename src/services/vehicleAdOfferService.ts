import axiosInstance from './baseService';

// API endpoints
const API_ENDPOINTS = {
  VEHICLE_OFFER: 'api/VehicleOffer',
  ACCEPT_VEHICLE_OFFER: 'api/Admin/AcceptVehicleOffer',
  REJECT_VEHICLE_OFFER: 'api/Admin/RejectVehicleOffer',
};

// Interface for Vehicle Offer
export interface VehicleOffer {
  id: number;
  senderId: string;
  receiverId: string;
  vehicleAdId: number;
  vehicleAdTitle: string;
  message: string;
  status: string;
  admin1Id: string;
  admin2Id: string;
  adminStatus: string;
  expiryDate: string;
  createdDate: string;
}

// Interface for Accept/Reject Vehicle Offer Request
export interface VehicleOfferActionRequest {
  id: number;
  adminId: string;
}

// Get all vehicle offers
const getAllVehicleOffers = async (): Promise<VehicleOffer[]> => {
  const response = await axiosInstance.get(API_ENDPOINTS.VEHICLE_OFFER);
  return response.data;
};

// Accept vehicle offer
const acceptVehicleOffer = async (request: VehicleOfferActionRequest): Promise<void> => {
  await axiosInstance.post(API_ENDPOINTS.ACCEPT_VEHICLE_OFFER, request);
};

// Reject vehicle offer
const rejectVehicleOffer = async (request: VehicleOfferActionRequest): Promise<void> => {
  await axiosInstance.post(API_ENDPOINTS.REJECT_VEHICLE_OFFER, request);
};

const vehicleAdOfferService = {
  getAllVehicleOffers,
  acceptVehicleOffer,
  rejectVehicleOffer,
};

export default vehicleAdOfferService;
