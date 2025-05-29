import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import vehicleAdOfferService, { type VehicleOffer, type VehicleOfferActionRequest } from '../services/vehicleAdOfferService';

// State interface
interface VehicleAdOfferState {
  vehicleOffers: VehicleOffer[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
}

// Initial state
const initialState: VehicleAdOfferState = {
  vehicleOffers: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// Get all vehicle offers
export const getAllVehicleOffers = createAsyncThunk(
  'vehicleAdOffer/getAllVehicleOffers',
  async (_, thunkAPI) => {
    try {
      return await vehicleAdOfferService.getAllVehicleOffers();
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Accept vehicle offer
export const acceptVehicleOffer = createAsyncThunk(
  'vehicleAdOffer/acceptVehicleOffer',
  async (request: VehicleOfferActionRequest, thunkAPI) => {
    try {
      await vehicleAdOfferService.acceptVehicleOffer(request);
      return request.id;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Reject vehicle offer
export const rejectVehicleOffer = createAsyncThunk(
  'vehicleAdOffer/rejectVehicleOffer',
  async (request: VehicleOfferActionRequest, thunkAPI) => {
    try {
      await vehicleAdOfferService.rejectVehicleOffer(request);
      return request.id;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Vehicle ad offer slice
export const vehicleAdOfferSlice = createSlice({
  name: 'vehicleAdOffer',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllVehicleOffers
      .addCase(getAllVehicleOffers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllVehicleOffers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vehicleOffers = action.payload;
      })
      .addCase(getAllVehicleOffers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // acceptVehicleOffer
      .addCase(acceptVehicleOffer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(acceptVehicleOffer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Optionally update the status of the accepted offer in the state
        const offerId = action.payload;
        const offerIndex = state.vehicleOffers.findIndex(offer => offer.id === offerId);
        if (offerIndex !== -1) {
          state.vehicleOffers[offerIndex].adminStatus = 'Accepted';
        }
      })
      .addCase(acceptVehicleOffer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // rejectVehicleOffer
      .addCase(rejectVehicleOffer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(rejectVehicleOffer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Optionally update the status of the rejected offer in the state
        const offerId = action.payload;
        const offerIndex = state.vehicleOffers.findIndex(offer => offer.id === offerId);
        if (offerIndex !== -1) {
          state.vehicleOffers[offerIndex].adminStatus = 'Rejected';
        }
      })
      .addCase(rejectVehicleOffer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = vehicleAdOfferSlice.actions;
export default vehicleAdOfferSlice.reducer; 