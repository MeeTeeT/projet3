import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {voterSlice} from "./voter/voter-slice";

import {web3Slice} from "./web3/web3-slice";
import {authSlice} from "./auth/auth-slice";
import storage from "redux-persist/lib/storage";
import { persistStore,persistReducer,FLUSH, REHYDRATE,PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { loggerMiddleWare } from "./middlewares/logger-middleware";


const persistConfig = {
    key: "root",
    version : 1,
    storage,
    whitelist:[]
}

const rootReducers = combineReducers({
    
    VOTER: voterSlice.reducer,
    AUTH: authSlice.reducer,
    WEB3: web3Slice.reducer
})

const persistedReducers = persistReducer(persistConfig,rootReducers)

const store = configureStore({
    reducer: persistedReducers,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).prepend(loggerMiddleWare.middleware),
})

const persistor = persistStore(store);

export {store, persistor};