import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartReducer";
import favoriteReducer from "./slices/favoriteReducer";
import userReducer from "./slices/userReducer";

const persistedState = localStorage.getItem("reduxState") ? JSON.parse(localStorage.getItem("reduxState")) : {}

export const store = configureStore({
    reducer: {
        //путь к кусочку хранилища "корзина"
        cart: cartReducer,
        //путь к кусочку хранилища "избранное"
        favorite: favoriteReducer,
        user: userReducer,
    },
    //
    preloadedState: persistedState,
})
store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})


