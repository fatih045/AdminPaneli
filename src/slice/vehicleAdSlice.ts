import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import vehicleAdService, { type VehicleAd, type VehicleAdActionRequest } from '../services/vehicleAdService';

// State interface
interface VehicleAdState {
  vehicleAds: VehicleAd[];
  selectedVehicleAd: VehicleAd | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
}

// Initial state
const initialState: VehicleAdState = {
  vehicleAds: [],
  selectedVehicleAd: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// Get all vehicle ads
export const getAllVehicleAds = createAsyncThunk(
  'vehicleAd/getAllVehicleAds',
  async (_, thunkAPI) => {
    try {
      return await vehicleAdService.getAllVehicleAds(0);
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get vehicle ad by id
export const getVehicleAdById = createAsyncThunk(
  'vehicleAd/getVehicleAdById',
  async (id: number, thunkAPI) => {
    try {
      return await vehicleAdService.getVehicleAdById(id);
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Accept vehicle ad
export const acceptVehicleAd = createAsyncThunk(
  'vehicleAd/acceptVehicleAd',
  async (request: VehicleAdActionRequest, thunkAPI) => {
    try {
      await vehicleAdService.acceptVehicleAd(request);
      return request.vehicleAdId;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Reject vehicle ad
export const rejectVehicleAd = createAsyncThunk(
  'vehicleAd/rejectVehicleAd',
  async (request: VehicleAdActionRequest, thunkAPI) => {
    try {
      await vehicleAdService.rejectVehicleAd(request);
      return request.vehicleAdId;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Vehicle ad slice
export const vehicleAdSlice = createSlice({
  name: 'vehicleAd',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    clearSelectedVehicleAd: (state) => {
      state.selectedVehicleAd = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllVehicleAds
      .addCase(getAllVehicleAds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllVehicleAds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vehicleAds = action.payload;
      })
      .addCase(getAllVehicleAds.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // getVehicleAdById
      .addCase(getVehicleAdById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVehicleAdById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedVehicleAd = action.payload;
      })
      .addCase(getVehicleAdById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // acceptVehicleAd
      .addCase(acceptVehicleAd.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(acceptVehicleAd.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Optionally update the status of the accepted vehicle ad in the state
        const vehicleAdId = action.payload;
        const vehicleAdIndex = state.vehicleAds.findIndex(ad => ad.id === vehicleAdId);
        if (vehicleAdIndex !== -1) {
          state.vehicleAds[vehicleAdIndex].status = 'Accepted';
        }
        if (state.selectedVehicleAd && state.selectedVehicleAd.id === vehicleAdId) {
          state.selectedVehicleAd.status = 'Accepted';
        }
      })
      .addCase(acceptVehicleAd.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // rejectVehicleAd
      .addCase(rejectVehicleAd.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(rejectVehicleAd.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Optionally update the status of the rejected vehicle ad in the state
        const vehicleAdId = action.payload;
        const vehicleAdIndex = state.vehicleAds.findIndex(ad => ad.id === vehicleAdId);
        if (vehicleAdIndex !== -1) {
          state.vehicleAds[vehicleAdIndex].status = 'Rejected';
        }
        if (state.selectedVehicleAd && state.selectedVehicleAd.id === vehicleAdId) {
          state.selectedVehicleAd.status = 'Rejected';
        }
      })
      .addCase(rejectVehicleAd.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset, clearSelectedVehicleAd } = vehicleAdSlice.actions;
export default vehicleAdSlice.reducer; 