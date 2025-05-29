import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cargoAdOfferService, { type CargoOffer, type CargoOfferActionRequest } from '../services/cargoAdOfferService';

// State interface
interface CargoAdOfferState {
  cargoOffers: CargoOffer[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
}

// Initial state
const initialState: CargoAdOfferState = {
  cargoOffers: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// Get all cargo offers
export const getAllCargoOffers = createAsyncThunk(
  'cargoAdOffer/getAllCargoOffers',
  async (_, thunkAPI) => {
    try {
      return await cargoAdOfferService.getAllCargoOffers();
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Accept cargo offer
export const acceptCargoOffer = createAsyncThunk(
  'cargoAdOffer/acceptCargoOffer',
  async (request: CargoOfferActionRequest, thunkAPI) => {
    try {
      await cargoAdOfferService.acceptCargoOffer(request);
      return request.id;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Reject cargo offer
export const rejectCargoOffer = createAsyncThunk(
  'cargoAdOffer/rejectCargoOffer',
  async (request: CargoOfferActionRequest, thunkAPI) => {
    try {
      await cargoAdOfferService.rejectCargoOffer(request);
      return request.id;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Cargo ad offer slice
export const cargoAdOfferSlice = createSlice({
  name: 'cargoAdOffer',
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
      // getAllCargoOffers
      .addCase(getAllCargoOffers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCargoOffers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cargoOffers = action.payload;
      })
      .addCase(getAllCargoOffers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // acceptCargoOffer
      .addCase(acceptCargoOffer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(acceptCargoOffer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Optionally update the status of the accepted offer in the state
        const offerId = action.payload;
        const offerIndex = state.cargoOffers.findIndex(offer => offer.id === offerId);
        if (offerIndex !== -1) {
          state.cargoOffers[offerIndex].adminStatus = 'Accepted';
        }
      })
      .addCase(acceptCargoOffer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // rejectCargoOffer
      .addCase(rejectCargoOffer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(rejectCargoOffer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Optionally update the status of the rejected offer in the state
        const offerId = action.payload;
        const offerIndex = state.cargoOffers.findIndex(offer => offer.id === offerId);
        if (offerIndex !== -1) {
          state.cargoOffers[offerIndex].adminStatus = 'Rejected';
        }
      })
      .addCase(rejectCargoOffer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = cargoAdOfferSlice.actions;
export default cargoAdOfferSlice.reducer; 