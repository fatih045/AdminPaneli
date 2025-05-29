import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cargoAdService, {type CargoAd, type CargoAdActionRequest } from '../services/cargoAdService';

// State interface
interface CargoAdState {
  cargoAds: CargoAd[];
  selectedCargoAd: CargoAd | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
}

// Initial state
const initialState: CargoAdState = {
  cargoAds: [],
  selectedCargoAd: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// Get all cargo ads
export const getAllCargoAds = createAsyncThunk(
  'cargoAd/getAllCargoAds',
  async (_, thunkAPI) => {
    try {
      return await cargoAdService.getAllCargoAds(0);
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get cargo ad by id
export const getCargoAdById = createAsyncThunk(
  'cargoAd/getCargoAdById',
  async (id: number, thunkAPI) => {
    try {
      return await cargoAdService.getCargoAdById(id);
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete cargo ad
export const deleteCargoAd = createAsyncThunk(
  'cargoAd/deleteCargoAd',
  async (id: number, thunkAPI) => {
    try {
      await cargoAdService.deleteCargoAd(id);
      return id;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Accept cargo ad
export const acceptCargoAd = createAsyncThunk(
  'cargoAd/acceptCargoAd',
  async (request: CargoAdActionRequest, thunkAPI) => {
    try {
      await cargoAdService.acceptCargoAd(request);
      return request.cargoId;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Reject cargo ad
export const rejectCargoAd = createAsyncThunk(
  'cargoAd/rejectCargoAd',
  async (request: CargoAdActionRequest, thunkAPI) => {
    try {
      await cargoAdService.rejectCargoAd(request);
      return request.cargoId;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Cargo ad slice
export const cargoAdSlice = createSlice({
  name: 'cargoAd',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    clearSelectedCargoAd: (state) => {
      state.selectedCargoAd = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllCargoAds
      .addCase(getAllCargoAds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCargoAds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cargoAds = action.payload;
      })
      .addCase(getAllCargoAds.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // getCargoAdById
      .addCase(getCargoAdById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCargoAdById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedCargoAd = action.payload;
      })
      .addCase(getCargoAdById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // deleteCargoAd
      .addCase(deleteCargoAd.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCargoAd.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cargoAds = state.cargoAds.filter(
          (cargoAd) => cargoAd.id !== action.payload
        );
      })
      .addCase(deleteCargoAd.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // acceptCargoAd
      .addCase(acceptCargoAd.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(acceptCargoAd.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Optionally update the status of the accepted cargo ad in the state
        const cargoId = action.payload;
        const cargoAdIndex = state.cargoAds.findIndex(ad => ad.id === cargoId);
        if (cargoAdIndex !== -1) {
          state.cargoAds[cargoAdIndex].status = 'Accepted';
        }
        if (state.selectedCargoAd && state.selectedCargoAd.id === cargoId) {
          state.selectedCargoAd.status = 'Accepted';
        }
      })
      .addCase(acceptCargoAd.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // rejectCargoAd
      .addCase(rejectCargoAd.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(rejectCargoAd.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Optionally update the status of the rejected cargo ad in the state
        const cargoId = action.payload;
        const cargoAdIndex = state.cargoAds.findIndex(ad => ad.id === cargoId);
        if (cargoAdIndex !== -1) {
          state.cargoAds[cargoAdIndex].status = 'Rejected';
        }
        if (state.selectedCargoAd && state.selectedCargoAd.id === cargoId) {
          state.selectedCargoAd.status = 'Rejected';
        }
      })
      .addCase(rejectCargoAd.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset, clearSelectedCargoAd } = cargoAdSlice.actions;
export default cargoAdSlice.reducer;
