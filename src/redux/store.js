import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import storage from 'redux-persist/lib/storage'
import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'

const rootReducer = combineReducers({ user: userReducer })

const persistConfig = {
    key: 'root',
    storage,
    version: 1
}

const persistorReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistorReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export const persistor = persistStore(store)