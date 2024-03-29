import { configureStore, combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import player from "../reducers/player";
import coordinates from "../reducers/coordinates";
import equipment from "../reducers/equipment";
import fight from "../reducers/fight";

const rootReducer = combineReducers({
  player: player,
  coordinates: coordinates,
  equipment: equipment,
  fight: fight,
});

const persistConfig = { key: "root", storage };

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const statistic = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(statistic);
