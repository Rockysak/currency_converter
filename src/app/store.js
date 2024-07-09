import { combineReducers, configureStore } from "@reduxjs/toolkit";
import converterReducer from '../features/converter/converterSlice'
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";


const persistConfig = {

    key : 'root',
    storage
}

const rootReducer = combineReducers({
    converter : persistReducer(persistConfig,converterReducer),
})

const store = configureStore({
    
       reducer: rootReducer,
       
});

const persistor = persistStore(store);


export default store ;
export {persistor} ;