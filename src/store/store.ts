import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice';
import cargoAdReducer from '../slice/cargoAdSlice';
import vehicleAdReducer from '../slice/vehicleAdSlice';
import cargoAdOfferReducer from '../slice/cargoAdOfferSlice';
import vehicleAdOfferReducer from '../slice/vehicleAdOfferSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cargoAd: cargoAdReducer,
    vehicleAd: vehicleAdReducer,
    cargoAdOffer: cargoAdOfferReducer,
    vehicleAdOffer: vehicleAdOfferReducer,
    // Add other reducers here as they are implemented
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
