import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { PERSIST, persistReducer, persistStore } from 'redux-persist';
import authReducer from './slices/AuthSlice';
import genericReducer from './slices/GenericSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  generic: genericReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'generic'],
};

const persistedState = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedState,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    }),
});

export const persistor = persistStore(store);

export const useAppDispatch = useDispatch;

export const useAppSelector = useSelector;
