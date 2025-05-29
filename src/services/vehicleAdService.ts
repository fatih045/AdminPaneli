import axiosInstance from './baseService';

// API endpoints
const API_ENDPOINTS = {
  VEHICLE_AD: 'api/VehicleAd',
  ACCEPT_VEHICLE_AD: 'api/Admin/AcceptVehicleAd',
  REJECT_VEHICLE_AD: 'api/Admin/RejectVehicleAd'
};

// Interface for Vehicle Ad
export interface VehicleAd {
  id: number;
  title: string;
  description: string;
  carrierId: string;
  carrierName: string;
  vehicleType: string;
  country: string;
  city: string;
  capacity: number;
  admin1Id: string | null;
  admin2Id: string | null;
  status: string | null;
  createdDate: string;
  adDate: string;
}

// Interface for Accept/Reject Vehicle Ad Request
export interface VehicleAdActionRequest {
  vehicleAdId: number;
  adminId: string;
}

// Get all vehicle ads
const getAllVehicleAds = async (): Promise<VehicleAd[]> => {
  const response = await axiosInstance.get(API_ENDPOINTS.VEHICLE_AD);
  return response.data;
};

// Get vehicle ad by id
const getVehicleAdById = async (id: number): Promise<VehicleAd> => {
  const response = await axiosInstance.get(`${API_ENDPOINTS.VEHICLE_AD}/${id}`);
  return response.data;
};

// Accept vehicle ad
const acceptVehicleAd = async (request: VehicleAdActionRequest): Promise<void> => {
  await axiosInstance.post(API_ENDPOINTS.ACCEPT_VEHICLE_AD, request);
};

// Reject vehicle ad
const rejectVehicleAd = async (request: VehicleAdActionRequest): Promise<void> => {
  await axiosInstance.post(API_ENDPOINTS.REJECT_VEHICLE_AD, request);
};

const vehicleAdService = {
  getAllVehicleAds,
  getVehicleAdById,
  acceptVehicleAd,
  rejectVehicleAd
};

export default vehicleAdService;
